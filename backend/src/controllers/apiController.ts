import dotenv from "dotenv";
import database from "../db/queries.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

dotenv.config();

const db = new database();

export default class ApiController {
    public signUp = async (req: Request, res: Response) => {
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
    public login = async (req: Request, res: Response) => {
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
                                expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                            }).send("cookie")
                        }

                    })
                }
            })
        }
    }
}
