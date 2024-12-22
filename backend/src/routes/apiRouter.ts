import express from "express"
import apiController from "../controllers/apiController.js"

const apiRouter = express.Router()

const controller = new apiController()

apiRouter.post("/signup", controller.signUp)

apiRouter.post("/login", controller.login)

apiRouter.get("/user", controller.verifyToken, controller.getUserInfo)

apiRouter.post("/send/message", controller.sendMessage)

export default apiRouter