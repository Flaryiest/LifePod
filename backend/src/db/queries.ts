import pool from "./pool.js";

class Database {
    async signUp(email: string, password: any) {
        try {
            await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, String(password)]);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    async login(email: string, password: string) {
        try {
            const { rows } = await pool.query("SELECT * FROM users WHERE email = ($1)", [email])
            return rows[0]   
        } catch(err) {
            console.log(err)
            return false
        }
    }
}

export default Database;

