console.log("Starting token generation.......");
require('dotenv').config({ path: '/Users/rubentv/Desktop/TEC/8 SEPTIMO SEMESTRE/RETO_OXXO/backend-tuto-nuevo/oxxo-ESLs-backend/.env' });
console.log("Environment variables loaded.......");
const jwt = require('jsonwebtoken');

const token = jwt.sign(
    { username: "Arturo", password: "passowrd", role: "admin" }, // the payload
    process.env.JWT_SECRET, // the secret key
    { expiresIn: '1h' }, // options
);
console.log("Token generated.......");

console.log(token);