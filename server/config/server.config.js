export const ServerConfig = {
    port: 3001,
    cors: {
        origin: [
            "http://localhost:4200"
        ],
        credentials: true
    },
    cookie: {
        expiresIn: 24 * 60 * 60 * 1000,
        tokenSecret: 'hushhush2024',
        tokenKey: 'accesstoken'
    }
}