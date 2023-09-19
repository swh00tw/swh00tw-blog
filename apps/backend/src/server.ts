import payload from "payload";
import dotenv from "dotenv";
import app from "./app";
import { Express } from "express";

dotenv.config();

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.redirect("/admin");
});

app.get("/health", (_, res) => {
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.send("All good!");
});

const setupPayload = async (app: Express) => {
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
};

setupPayload(app);
if (process.env["BACKEND_ENV"] === "dev") {
  // Add your own express routes here
  app.listen(3000);
}

export default app;
