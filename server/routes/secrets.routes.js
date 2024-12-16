import { Router } from "express";
import { addSecret, deleteSecret, secrets } from "../controllers/secrets.controller.js";

const router = Router();

router.get('/:userId', secrets);
router.post('/:userId', addSecret);
router.delete('/:id', deleteSecret);

export default router;