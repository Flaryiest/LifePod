import express, { Request, Response } from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import cors from "cors"
import apiRouter from "./routes/apiRouter.js"
dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(cookieParser())
app.use(cors({origin: "*", credentials: true}))

app.get("/", (req: Request, res: Response) => {
    res.send("Hello!")
})

app.use("/api", apiRouter)

app.listen(port, () => {
    console.log("App listening at ${port}")
})
