import express, { Express } from "express";
import cors from "cors";

const corsOptions = {
  origin: ["http://localhost:5173", "https://swh00tw-blog.vercel.app"],
};

const app: Express = express();
app.use(cors(corsOptions));
// cache control
app.use(function (req, res, next) {
  // here you can define period in second, this one is 5 minutes
  const period = 60 * 5;
  // you only want to cache for GET requests
  if (req.method == "GET") {
    res.set("Cache-control", `public, max-age=${period}`);
  } else {
    // for the other requests set strict no caching parameters
    res.set("Cache-control", `no-store`);
  }
  next();
});

export default app;
