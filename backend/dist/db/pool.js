import dotenv from "dotenv";
import pg from "pg";
dotenv.config();
const databaseURL = process.env.DATABASE_URL;
export default new pg.Pool({
    database: databaseURL
});
//# sourceMappingURL=pool.js.map