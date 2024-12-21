import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import apiRouter from "./routes/apiRouter.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));
app.get("/", (req, res) => {
    res.send("Hello!");
});
app.use("/api", apiRouter);
app.listen(port, () => {
    console.log("App listening at ${port}");
});
//# sourceMappingURL=index.js.map