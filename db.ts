import 'dotenv/config';
import postgres, { Sql } from 'postgres';

const sql = postgres({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || 'Undefined', 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default sql;
