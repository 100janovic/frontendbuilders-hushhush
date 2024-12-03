import jwt from "jsonwebtoken";
import { ServerConfig } from "../config/server.config.js";

export const generateToken = (payload) => {
    return jwt.sign(
        payload,
        ServerConfig.token.secret,
        {
            expiresIn: ServerConfig.token.expiresIn
        }
    )
};

export const isTokenValid = (token) => {
    let isValid = false;

    jwt.verify(
        token,
        ServerConfig.token.secret,
        (err, payload) => {
            isValid = err ? false : payload;
        })

    return isValid;
}

export const getTokenFromHeader = (headers) => {
    const authorization = headers.authorization;
    if (!authorization) {
        return null;
    }
    return authorization.split(' ')['1'];
}