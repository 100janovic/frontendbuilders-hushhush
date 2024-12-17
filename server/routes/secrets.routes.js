import { Router } from "express";
import { addSecret, deleteSecret, getSecret, secrets } from "../controllers/secrets.controller.js";

const router = Router();

router.get('/', secrets);
router.get('/:secretId', getSecret);
router.post('/', addSecret);
router.delete('/:id', deleteSecret);

export default router;