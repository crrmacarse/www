export default () => ({
    port: parseInt(process.env.PORT, 10) || 1111,
    database: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 3308,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    }
});