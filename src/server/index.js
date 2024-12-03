import express, { json, urlencoded } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import secretsRoutes from "./routes/secrets.routes.js";
import authMiddleware from "./routes/auth.middleware.js";
import { ServerConfig } from "./config/server.config.js";

// Config
const port = process.env.PORT || 3001;
const host = process.env.HOST ?? 'localhost';

// App create
const app = express();

// Middlewares
app.use(cors(ServerConfig.cors));
app.use(json({ limit: '100mb' }));
app.use(urlencoded({ limit: '100mb', extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/', authMiddleware, secretsRoutes);

// App start
app.listen(port, () => {
    console.log(`Server is running at http://${host}:${port}`);
});
