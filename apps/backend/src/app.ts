import express, { Express } from "express";
import cors from "cors";

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://swh00tw-blog.vercel.app",
    /^https:\/\/swh00tw-blog-49mjzhxmq-swh00tw\.vercel\.app\/([a-zA-Z0-9-?=_]+)$/,
  ],
};

const app: Express = express();
app.use(cors(corsOptions));

export default app;
