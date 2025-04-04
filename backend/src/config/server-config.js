const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    SWAGGER_URL:process.env.SWAGGER_URL
}