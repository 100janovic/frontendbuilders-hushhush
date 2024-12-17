import { Router } from "express";
import { addSecret, deleteSecret, getSecret, secrets } from "../controllers/secrets.controller.js";

const router = Router();

router.get('/:userId', secrets);
router.get('/:userId/:secretId', getSecret);
router.post('/:userId', addSecret);
router.delete('/:id', deleteSecret);

export default router;