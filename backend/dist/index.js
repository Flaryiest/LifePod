import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import apiRouter from "./routes/apiRouter.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.json());
app.use((express.urlencoded({ extended: true })));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.get("/", (req, res) => {
    res.send("Hello!");
});
app.post("/", (req, res) => {
    res.send("Hi");
});
app.use("/api", apiRouter);
app.listen(port, () => {
    console.log("App listening at ${port}");
});
//# sourceMappingURL=index.js.map