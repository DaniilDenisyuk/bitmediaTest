import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import "../db/init.js";
import { logErrors, errorHandler } from "./middleware/index.js";
import { statsController } from "./controllers/index.js";

import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const port = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.resolve(__dirname, "../client-app/build")));

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/stats", statsController);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client-app/build", "index.html"));
});

app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Rest api for test listening at http://localhost:${port}`);
});
