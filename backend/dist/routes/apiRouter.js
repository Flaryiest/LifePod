import express from "express";
import apiController from "../controllers/apiController.js";
const apiRouter = express.Router();
const controller = new apiController();
apiRouter.post("/signup", controller.signUp);
apiRouter.post("/login", controller.login);
apiRouter.post("/user", controller.verifyToken, controller.getUserInfo);
apiRouter.post("/create/chat", controller.createChat);
apiRouter.post("/send/message", controller.sendMessage);
apiRouter.post("/update/box/contents", controller.updateBoxContents);
apiRouter.post("/get/messages", controller.getMessages);
apiRouter.post("/get/box/contents", controller.getBoxContents);
export default apiRouter;
//# sourceMappingURL=apiRouter.js.map