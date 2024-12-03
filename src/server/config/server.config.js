export const ServerConfig = {
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