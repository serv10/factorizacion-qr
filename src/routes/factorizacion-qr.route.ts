import { Application, Router } from "express";

import { factorizacionQR } from "../controllers/factorizacion-qr.controller";

const router = Router();

router.post("/", factorizacionQR as Application);

export default router;
