import pool from "./pool.js"
export default function db() {
    async function signUp(email: string, password: string) {
        await pool.query("INSERT INTO users (email, password) VALUES (($1), ($2))", [email, password])
    }
}