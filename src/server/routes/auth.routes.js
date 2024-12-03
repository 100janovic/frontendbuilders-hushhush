import { Router } from "express";
import { register, login, status, logout } from "../controllers/auth.controller.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/status', status);
router.post('/logout', logout);

export default router;