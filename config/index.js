import { createPool } from "mysql";
import { config } from "dotenv";

let connection = createPool({
    host: process.env.HOST,
    database: process.env.DBName,
    user: process.env.userName,
    password: process.env.UserPass,
    multipleStatements: true,
    connectionLimit: 30
})

config()

export {
    connection
}