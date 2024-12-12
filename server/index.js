import express, { json, urlencoded } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import secretsRoutes from "./routes/secrets.routes.js";
import authMiddleware from "./routes/auth.middleware.js";
import { ServerConfig } from "./config/server.config.js";
import { logger } from "./utils/logger.js";

// Config
const port = process.env.PORT || ServerConfig.port;
const host = process.env.HOST ?? 'localhost';

// Create
const app = express();

// Middlewares
app.use(cors(ServerConfig.cors));
app.use(json({ limit: '1mb' }));
app.use(urlencoded({ limit: '1mb', extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/secrets', authMiddleware, secretsRoutes);

// Start
app.listen(port, () => {
    logger(`Server is running at http://${host}:${port}`);
});
