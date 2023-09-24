import express, { Express } from "express";
import cors from "cors";

const corsOptions = {
  origin: ["http://localhost:5173", "https://swh00tw-blog.vercel.app"],
};

const app: Express = express();
app.use(cors(corsOptions));

export default app;
