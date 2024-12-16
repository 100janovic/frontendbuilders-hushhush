import { ServerConfig } from "../config/server.config.js";

export const setCookie = (token) => {
    return `${ServerConfig.cookie.tokenKey}=${token}; Path=/; Expires=${ServerConfig.cookie.expiresIn}; HttpOnly`;
}