import express, { Express } from "express";
import cors from "cors";

const corsOptions = {
  origin: ["*"],
};

const app: Express = express();
app.use(cors(corsOptions));

export default app;
