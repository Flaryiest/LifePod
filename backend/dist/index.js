import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import apiRouter from "./routes/apiRouter.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors({ origin: ["https://lifepod.pages.dev", "184.64.116.12", "https://lifepod-hardware.pages.dev"], credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use((express.urlencoded({ extended: true })));
app.use("/api", apiRouter);
app.listen(3000, () => {
    console.log("Port: " + String(port));
});
//# sourceMappingURL=index.js.map