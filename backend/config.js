module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGODB_URI: process.env.DATABASE_URI,
    JWT_SECRET: process.env.AUTH_SECRET_KEY,
    JWT_EXPIRY: process.env.JWT_EXPIRY || '3h'
}