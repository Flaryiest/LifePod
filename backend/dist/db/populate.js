import dotenv from "dotenv";
import pg from "pg";
dotenv.config();
const databaseURL = process.env.DATABASE_URL;
const dbReset = 'DROP TABLE messages';
const dbInit = 'CREATE TABLE users (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, email TEXT UNIQUE, password TEXT)';
const createChatTable = 'CREATE TABLE chats (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, userID INTEGER, boxID INTEGER, chatDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP)';
const createMessageTable = 'CREATE TABLE messages (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, chatID INTEGER, message TEXT, sender TEXT, messageDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP)';
const createBoxTable = 'CREATE TABLE boxes (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, connected BOOLEAN, connected_userID INTEGER)';
const createBoxItemTable = 'CREATE TABLE box_contents (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, boxID INTEGER, connected_userID INTEGER, item_information JSONB)';
/* {
  "gauze": "false",
  "aspirin": "false",
  "rubbing alcohol": "false",
  "epi pen": "false",
  "medical tape": "false",
  "gloves": "false",
  "benadryl": "false",
  "scissors": "false"
}
*/
async function main() {
    console.log("creating - please wait");
    const client = new pg.Client({
        connectionString: databaseURL
    });
    await client.connect();
    await client.query(dbReset);
    //await client.query(dbInit)
    //await client.query(createChatTable)
    await client.query(createMessageTable);
    //await client.query(createBoxTable)
    //await client.query(createBoxItemTable)
    await client.end();
    console.log("done");
}
main();
//# sourceMappingURL=populate.js.map