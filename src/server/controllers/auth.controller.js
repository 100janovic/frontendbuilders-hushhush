import db from "../db/db.js";
import bcrypt from "bcryptjs";
import { generateToken, getTokenFromHeader, isTokenValid } from "../utils/token.js";


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
        password: hashedPassword
    }

    db.data.users.push(newUser);
    db.write();

    const token = generateToken({
        email
    });

    res.status(200).json({
        message: "Register successs!",
        token
    })
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
            email
        });
        res.status(200).json({
            message: "Login success",
            user: user,
            token
        })
        return;
    }

    res.status(401).json({ message: "Wrong credentials" })
};


export const status = (req, res) => {
    const token = getTokenFromHeader(req.headers);
    if (!token) {
        res.status(401).json({ message: "No authorization header" })
        return;
    }

    const isValid = isTokenValid(token);
    if (!isValid) {
        res.status(401).json({ message: "Token not valid" });
        return;
    }

    const user = db.data.users.find((u) => u.email === isValid.email);
    if (!user) {
        res.status(401).json({ message: "User not found" });
        return;
    }

    res.status(200).json({
        message: "User is logged succefully",
        user: {
            email: user.email
        }
    });
};


export const logout = (req, res) => { };