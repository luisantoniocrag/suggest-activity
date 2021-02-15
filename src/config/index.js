const dotenv = require('dotenv');

// Set the development ENV for default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
    throw new Error(".env file not found");
}

module.exports = {
    port: parseInt(process.env.PORT, 10) || 5000,
    databaseURL: process.env.MONGODB_URI,
    api: {
        prefix: '/api'
    }
}