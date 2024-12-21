import dotenv from "dotenv"
import db from "../db/queries.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { Request, Response } from "express"
dotenv.config()

export default class apiController {
    public async signUp(req: Request, res: Response) {
        bcrypt.hash(req.body.password, 10, )
    }
}