import express from "express";
import cors from "cors";

const corsOptions = {
  origin: ["*"],
};

const app = express();
app.use(cors(corsOptions));

export default app;
