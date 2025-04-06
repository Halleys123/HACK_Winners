const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    SWAGGER_URL:process.env.SWAGGER_URL,
    JWT_SECRET:process.env.JWT_SECRET,
    RPC_URL:process.env.RPC_URL,
    CONTRACT_ADDRESS:process.env.CONTRACT_ADDRESS,
    MNEMONIC:process.env.MNEMONIC
}