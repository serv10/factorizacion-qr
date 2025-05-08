import cors from "cors";
import express from "express";
import morgan from "morgan";

import { NODE_API_URL } from "./configs/config.ts";
import apiRoutes from "./routes/index.route.ts";

const app = express();

app.use(
  cors({
    origin: NODE_API_URL,
  }),
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", apiRoutes);

export default app;
