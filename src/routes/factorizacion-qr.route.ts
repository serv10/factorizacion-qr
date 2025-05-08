import { Router } from "express";

import { factorizacionQR } from "../controllers/factorizacion-qr.controller.ts";

const router = Router();

router.post("/", factorizacionQR);

export default router;
