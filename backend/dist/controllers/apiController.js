import dotenv from "dotenv";
import database from "../db/queries.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
dotenv.config();
const db = new database();
export default class ApiController {
    constructor() {
        this.signUp = async (req, res) => {
            bcrypt.hash(req.body.password, 10, async function (err, hash) {
                if (err) {
                    console.error(err, "error");
                    return res.status(500).send("Internal server error");
                }
                const response = await db.signUp(req.body.email, hash);
                if (response) {
                    res.status(200).send("User signed up successfully");
                }
                else {
                    res.status(400).send("Failed to sign up user");
                }
            });
        };
        this.login = async (req, res) => {
            const userInfo = await db.login(req.body.email, req.body.password);
            if (!(userInfo)) {
                res.status(400).send();
            }
            else {
                bcrypt.compare(req.body.password, userInfo.password, function (err, result) {
                    if (err) {
                        console.log(err, "error");
                        res.status(400).send();
                    }
                    else {
                        console.log("pog");
                        jwt.sign({ userInfo }, process.env.JWT_SECRET, { expiresIn: "100000s" }, (err, token) => {
                            console.log(userInfo);
                            if (err) {
                                console.log(err);
                                res.status(400).send();
                            }
                            else {
                                res.status(200).cookie("jwt", token, {
                                    sameSite: 'none',
                                    secure: true,
                                    path: '/',
                                    httpOnly: true,
                                    expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
                                }).send("cookie");
                            }
                        });
                    }
                });
            }
        };
        this.verifyToken = async (req, res, next) => {
            const token = req.cookies.jwt;
            if (!token) {
                console.log("not logged in");
                res.status(400).send();
            }
            else {
                jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send();
                    }
                    else {
                        console.log(decoded.userInfo, "decoded");
                        req.user = decoded.userInfo;
                    }
                    next();
                });
            }
        };
        this.getUserInfo = async (req, res) => {
            console.log(req.user, "user");
            if (req.user) {
                const userInfo = await db.getInfo(req.user);
                res.json(userInfo).status(200).send();
            }
            else {
                res.status(400).send();
            }
        };
        this.createChat = async (req, res) => {
            const status = await db.createChat(req.body.userid, req.body.boxid);
            if (status) {
                res.status(200).send();
            }
            else {
                res.status(400).send();
            }
        };
        this.sendMessage = async (req, res) => {
            console.log(req.body.message, req.body.chatid, req.body.sender);
            const status = await db.sendMessage(req.body.chatid, req.body.message, req.body.sender);
            if (status) {
                res.status(200).send();
            }
            else {
                console.log("message failed to send");
                res.status(400).send();
            }
        };
        this.updateBoxContents = async (req, res) => {
            console.log(req.body.boxid, req.body.boxContents);
            const status = await db.updateBoxContents(req.body.boxid, req.body.boxContents);
            console.log(status);
            if (status) {
                res.status(200).send();
            }
            else {
                res.status(400).send();
            }
        };
        this.getMessages = async (req, res) => {
            console.log(req.body.chatid);
            const messages = await db.getMessages(req.body.chatid);
            if (messages) {
                res.json(messages).status(200).send();
            }
            else {
                res.status(400).send();
            }
        };
        this.getBoxContents = async (req, res) => {
            console.log(req.body.boxid);
            const boxContents = await db.getBoxContents(req.body.boxid);
            if (boxContents) {
                res.json(boxContents).status(200).send();
            }
            else {
                res.status(400).send();
            }
        };
    }
}
//# sourceMappingURL=apiController.js.map