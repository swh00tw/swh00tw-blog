import payload from "payload";
import dotenv from "dotenv";
import app from "../app";

dotenv.config();
payload.init({
  secret: process.env.BACKEND_PAYLOAD_SECRET as string,
  mongoURL: process.env.BACKEND_MONGODB_URI as string,
  express: app,
  onInit: async () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
  },
});

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
});

module.exports = app;
