import express from "express";
import cors from "cors";
import router from "./routes/routes.js";
import "./db.js";
import "./mail.js";
import cookieParser from "cookie-parser";

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(router);
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log("server ok :D", port);
});
