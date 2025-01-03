import pool from "./pool.js";
class Database {
    async signUp(email, password) {
        try {
            await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, String(password)]);
            return true;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    }
    async login(email, password) {
        try {
            const { rows } = await pool.query("SELECT * FROM users WHERE email = ($1)", [email]);
            return rows[0];
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
    async getInfo(user) {
        try {
            const { rows } = await pool.query("SELECT * FROM users LEFT JOIN boxes ON users.id = boxes.connected_userid LEFT JOIN box_contents ON boxes.id = box_contents.boxid ");
            console.log(rows);
            rows.filter((row) => {
                return row.id = user.id;
            });
            console.log(rows, "filtered");
            return rows[0];
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
    async sendMessage(chatid, message, sender) {
        try {
            const status = await pool.query("INSERT INTO messages (chatid, message, sender) VALUES (($1), ($2), ($3))", [chatid, message, sender]);
            if (status) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
    async getBoxContents(boxid) {
        try {
            const { rows } = await pool.query("SELECT * FROM box_contents WHERE ($1) = box_contents.boxid", [boxid]);
            if (rows) {
                return rows[0];
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
    async updateBoxContents(boxid, boxContents) {
        try {
            const status = await pool.query("UPDATE box_contents SET item_information = ($2) WHERE ($1) = box_contents.boxid", [boxid, boxContents]);
            console.log("test", status);
            if (status) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
    async getMessages(chatid) {
        try {
            const { rows } = await pool.query("SELECT * FROM messages WHERE chatid = ($1)", [chatid]);
            if (rows) {
                return rows;
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
    async createChat(boxid, userid) {
        try {
            const status = await pool.query("INSERT INTO chats (userid, boxid) VALUES (($1), ($2))", [boxid, userid]);
            if (status) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
}
export default Database;
//# sourceMappingURL=queries.js.map