import express from "express"
import apiController from "../controllers/apiController.js"

const apiRouter = express.Router()

const controller = new apiController()

apiRouter.post("/signup", controller.signUp)

apiRouter.post("/login", controller.login)


export default apiRouter