import http from "http";
import express from "express";
import dotenv from "dotenv";
import db from "./startup/db";
import UserRoutes from "./routes/User/userRoutes";
import cors from "cors";
import bodyParser from "body-parser";
import todoRoutes from "./routes/Todo/todoRoutes";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
const PORT = process.env.PORT_SERVER;

const httpServer = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, X-Requested-With"
  );
  next();
});
app.use(
  cors({
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId", "Set-Cookie"],
    origin: "http://localhost:4000",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

httpServer.listen(PORT, () => {
  console.log(`The application is listening on port ${PORT}`);
});

async function initRoutes(): Promise<void> {
  const connection = await db();
  UserRoutes(app, connection);
  todoRoutes(app, connection);
}

initRoutes();
