import jwt from "jsonwebtoken";
import { ServerConfig } from "../config/server.config.js";

export const generateToken = (payload) => {
    return jwt.sign(
        payload,
        ServerConfig.cookie.tokenSecret,
        {
            expiresIn: ServerConfig.cookie.expiresIn
        }
    )
};

export const getVerifiedUsesFromToken = (token) => {
    let result = false;

    jwt.verify(
        token,
        ServerConfig.cookie.tokenSecret,
        (err, payload) => {
            result = err ? false : payload;
        })

    return result;
}