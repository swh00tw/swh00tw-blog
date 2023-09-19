import payload from "payload";
import dotenv from "dotenv";
import app from "./app";
import { Express } from "express";

dotenv.config();

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
});

const start = async (app: Express) => {
  dotenv.config();
  // Initialize Payload
  await payload.init({
    secret: process.env["BACKEND_PAYLOAD_SECRET"] as string,
    mongoURL: process.env["BACKEND_MONGODB_URI"] as string,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Add your own express routes here
  app.listen(3000);
};

if (process.env["BACKEND_ENV"] === "dev") {
  start(app);
}

export { app, start };
