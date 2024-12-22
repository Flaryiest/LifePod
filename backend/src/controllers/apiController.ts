import dotenv from "dotenv";
import database from "../db/queries.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

dotenv.config();

const db = new database();

type userType = {
    id: number,
    email: string,
    password: string
}

interface CustomRequest extends Request {
    user?: userType;
}

export default class ApiController {
    signUp = async (req: Request, res: Response) => {
        bcrypt.hash(req.body.password, 10, async function (err, hash) {
            if (err) {
                console.error(err, "error");
                return res.status(500).send("Internal server error");
            }
            const response = await db.signUp(req.body.email, hash);
            if (response) {
                res.status(200).send("User signed up successfully");
            } else {
                res.status(400).send("Failed to sign up user");
            }
        });
    };
    login = async (req: Request, res: Response) => {
        const userInfo = await db.login(req.body.email, req.body.password)
        if (!(userInfo)) {
            res.status(400).send()
        }
        else {
            bcrypt.compare(req.body.password, userInfo.password, function(err, result) {
                if (err) {
                    console.log(err, "error")
                    res.status(400).send()
                }
                else {
                    console.log("pog")
                    jwt.sign({userInfo}, process.env.JWT_SECRET, {expiresIn: "10000s"}, (err: any, token: any) => {
                        console.log(userInfo)
                        if (err) {
                            console.log(err)
                            res.status(400).send()
                        }
                        else {
                            res.status(200).cookie("jwt", token, {
                                sameSite:'none',
                                secure: true, 
                                path: '/',
                                httpOnly: true,
                                expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
                            }).send("cookie")
                        }

                    })
                }
            })
        }
    }
    verifyToken = async (req: CustomRequest, res: Response, next: any) => {
        const token = req.cookies.jwt
        if (!token) {
            console.log("not logged in")
        }
        else {
            jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
                if (err) {
                    console.log(err)
                    res.status(400).send()
                }
                else {
                    console.log(decoded.userInfo, "decoded")
                    req.user = decoded.userInfo
                    
                }
                next()
            })
        }
    }
    getUserInfo = async (req: CustomRequest, res: Response) => {
        console.log(req.user, "user")
        if (req.user) {
            const userInfo = await db.getInfo(req.user)
            res.json(userInfo).status(200).send()
        }
        else {
            res.status(400).send()
        }
    }

    createChat = async (req:Request, res:Response) => {
        if (req.body.user) {
            
        }
    }

    sendMessage = async (req: Request, res: Response) => {
        console.log(req.body.message, req.body.chatid, req.body.sender)
        const status = await db.sendMessage(req.body.chatid, req.body.message, req.body.sender)
        if (status) {
            res.status(200).send()
        }
        else {
            console.log("message failed to send")
            res.status(400).send()
        }
    }

    updateBoxContents = async(req: Request, res: Response) => {
        console.log(req.body.boxid, req.body.boxContents)
    }

    getMessages = async (req: Request, res: Response) => {
        console.log(req.body.chatid)
        const messages = await db.getMessages(req.body.chatid)
        if (messages) {
            res.json(messages).status(200).send()
        }
        else  {
            res.status(400).send()
        }
    }
}
