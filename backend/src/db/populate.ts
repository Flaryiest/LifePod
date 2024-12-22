import dotenv from "dotenv"
import pg from "pg"

dotenv.config()
const databaseURL = process.env.DATABASE_URL
const dbReset = 'DROP TABLE users'
const dbInit = 'CREATE TABLE users (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, email TEXT UNIQUE, password TEXT)'
const createChatTable = 'CREATE TABLE chats (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, userOneID INTEGER, userTwoID INTEGER)'
const createMessageTable = 'CREATE TABLE messages (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, chatID INTEGER, message TEXT, userOneID INTEGER, userTwoID INTEGER, messageDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP)'
async function main() {
    console.log("creating - please wait")
    const client = new pg.Client({
        connectionString: databaseURL
    })
    await client.connect()
    await client.query(dbReset)
    await client.query(dbInit)
    await client.end()
    console.log("done")
}

main()