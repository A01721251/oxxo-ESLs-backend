console.log("Starting token generation.......");
require('dotenv').config();
const jwt = require('jsonwebtoken');

const token = jwt.sign(
    { username: "Arturo", password: "passowrd", role: "admin" }, // the payload
    process.env.JWT_SECRET, // the secret key
    { expiresIn: '1h' } // options
);

console.log(token);