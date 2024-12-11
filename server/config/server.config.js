export const ServerConfig = {
    port: 3001,
    cors: {
        origin: [
            "http://localhost:4200"
        ],
        credentials: true
    },
    token: {
        secret: 'hushhush2024',
        expiresIn: '24h'
    }
}