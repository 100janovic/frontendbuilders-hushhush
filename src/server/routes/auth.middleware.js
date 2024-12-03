import { getTokenFromHeader, isTokenValid } from "../utils/token.js";

const authMiddleware = (req, res, next) => {
    const token = getTokenFromHeader(req.headers);
    if (!token) {
        res.status(401).json({ message: "No authorization header" })
        return;
    }

    const isValid = isTokenValid(token);
    if (isValid) {
        return next();
    }

    return res.status(401).json({ message: "Unauthorized" });
}

export default authMiddleware;