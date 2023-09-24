import express, { Express } from "express";
import cors from "cors";

const allowedOrigin = /^https:\/\/swh00tw-blog([a-zA-Z0-9-]+)\.vercel\.app\/$/;

const corsOptions = {
  origin: (origin, callback) => {
    if (origin === "http://localhost:5173" || allowedOrigin.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const app: Express = express();
app.use(cors(corsOptions));

export default app;
