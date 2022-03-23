const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const config = {
    DBhost: process.env.DB_HOST,
    DBusername: process.env.DB_USER,
    DBpassword: process.env.DB_PASSWORD,
    DBdatabase: process.env.DB,
    DBport: process.env.PORT,
    JWTexpire: process.env.JWT_EXPIRES_IN,
    JWTsecret: process.env.JWT_SECRET
}

module.exports = { config }