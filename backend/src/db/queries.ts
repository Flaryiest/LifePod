import pool from "./pool.js"
export default function db() {
    async function signUp(email: string, password: string) {
        try {
            await pool.query("INSERT INTO users (email, password) VALUES (($1), ($2))", [email, password])
            return true
        } catch(err) {
            console.log(err)
            return false
        }
    }
    async function login(email: string, password: string) {
        
    }
}