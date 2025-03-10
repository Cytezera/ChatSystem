const mysql = require("mysql2");
require("dotenv").config();

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);
const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        connectTimeout: 30000,
        waitForConnections: true,
        queueLimit: 0});

db.connect((err) => {
    if (err) {
        console.error("❌ Database unable to connect:", err);
        return;
    }
    console.log("✅ Database successfully connected");
});

