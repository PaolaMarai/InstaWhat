require('dotenv').config()

const config = {
    MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,
    PORT: process.env.PORT,
    BINDIND_IP: process.env.BINDIND_IP,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.EMAILPASSWORD
}


module.exports = config