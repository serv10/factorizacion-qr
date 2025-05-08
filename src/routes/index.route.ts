import { Router } from "express";

import factorizacionRouter from "./factorizacion-qr.route.ts";
import authJWT from "../middlewares/auth-jwt.middleware.ts";

const router = Router();

router.use("/factorizacion", authJWT, factorizacionRouter);

export default router;
