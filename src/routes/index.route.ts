import { Router, type Application } from "express";

import factorizacionRouter from "./factorizacion-qr.route";
import authJWT from "../middlewares/auth-jwt.middleware";

const router = Router();

router.use("/factorizacion",authJWT as Application, factorizacionRouter);

export default router;
