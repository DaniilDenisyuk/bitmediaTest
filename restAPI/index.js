import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import "../db/init.js";
import { logErrors, errorHandler } from "./middleware/index.js";
import { statsController } from "./controllers/index.js";

const port = process.env.PORT || 3005;

const app = express();

app.use(express.static(path.join("static")));
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/stats", statsController);
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Rest api for test listening at http://localhost:${port}`);
});
