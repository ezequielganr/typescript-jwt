import { Pool } from "pg";

const config: object = {
    database: process.env.DB,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}

const pool = new Pool(config);

export default pool;
