import express, { Express } from "express";
import cors from "cors";

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://swh00tw-blog.vercel.app",
    /swh00tw-blog([a-zA-Z0-9-]+)\.vercel\.app\/$/,
  ],
};

const app: Express = express();
app.use(cors(corsOptions));

export default app;
