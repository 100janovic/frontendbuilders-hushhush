import db from "../db/db.js";
import bcrypt from "bcryptjs";
import { generateToken, getVerifiedUsesFromToken } from "../utils/token.js";
import { generateId } from "../utils/generate-id.js";
import { setCookie } from "../utils/set-cookie.js";
import { ServerConfig } from "../config/server.config.js";


export const register = async (req, res) => {
    const { email, password } = req.body;
    const user = db.data.users.find((u) => u.email === email);

    if (user) {
        res.status(401).json({ message: "User exists!" })
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        email,
        password: hashedPassword,
        id: generateId(db.data.users)
    }

    db.data.users.push(newUser);
    db.write();

    const token = generateToken({
        email,
        id: newUser.id
    });

    res
        .status(200)
        .setHeader("Set-Cookie", setCookie(token))
        .setHeader("Access-Control-Allow-Credentials", "true")
        .json({
            message: "Register successs!",
            user: newUser
        });
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(401).json({ message: "Wrong credentials" });
        return;
    }

    const user = db.data.users.find((u) => u.email === email);
    if (!user) {
        res.status(401).json({ message: "No user" });
        return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
        const token = generateToken({
            email,
            id: user.id
        });
        res
            .status(200)
            .setHeader("Set-Cookie", setCookie(token))
            .setHeader("Access-Control-Allow-Credentials", "true")
            .json({
                message: "Login success",
                user: user
            });
        return;
    }

    res.status(401).json({ message: "Wrong credentials" })
};


export const status = (req, res) => {
    const token = req.cookies[ServerConfig.cookie.tokenKey];

    if (!token) {
        res.status(401).json({ message: "No authorization header" })
        return;
    }

    const userFromToken = getVerifiedUsesFromToken(token);
    if (!userFromToken) {
        res.status(401).json({ message: "Token not valid" });
        return;
    }

    const user = db.data.users.find((u) => u.email === userFromToken.email);
    if (!user) {
        res
            .clearCookie(ServerConfig.cookie.tokenKey)
            .status(401)
            .json({ message: "User not found" });
        return;
    }

    res.status(200).json({
        message: "User is logged succefully",
        user: {
            email: user.email,
            id: user.id
        }
    });
};


export const logout = (req, res) => {
    return res.clearCookie(ServerConfig.cookie.tokenKey).json({
        message: "User is logged out"
    });
};