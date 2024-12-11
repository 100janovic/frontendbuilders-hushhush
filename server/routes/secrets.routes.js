import { Router } from "express";
import { secrets } from "../controllers/secrets.controller.js";

const router = Router();

router.get('/secrets', secrets);

export default router;