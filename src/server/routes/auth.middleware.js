import { getTokenFromHeader, getVerifiedUsesFromToken } from "../utils/token.js";

const authMiddleware = (req, res, next) => {
    const token = getTokenFromHeader(req.headers);
    if (!token) {
        res.status(401).json({ message: "No authorization header" })
        return;
    }

    const user = getVerifiedUsesFromToken(token);
    if (user) {
        return next();
    }

    return res.status(401).json({ message: "Unauthorized" });
}

export default authMiddleware;