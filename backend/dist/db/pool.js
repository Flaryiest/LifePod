import dotenv from "dotenv";
dotenv.config();
import { Pool } from "pg";
const databaseURL = process.env.DATABASE_URL;
export default new Pool({
    database: databaseURL
});
//# sourceMappingURL=pool.js.map