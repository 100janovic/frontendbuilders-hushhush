import { ServerConfig } from "../config/server.config.js";
import { getVerifiedUsesFromToken } from "../utils/token.js";

const authMiddleware = (req, res, next) => {
    const token = req.cookies[ServerConfig.cookie.tokenKey];
    if (!token) {
        res.status(401).json({ message: "No authorization header" })
        return;
    }

    const user = getVerifiedUsesFromToken(token);
    if (user) {
        req.user = user;
        return next();
    }

    return res.status(401).json({ message: "Unauthorized" });
}

export default authMiddleware;