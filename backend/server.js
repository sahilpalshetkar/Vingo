import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import shopRouter from "./routes/shop.routes.js";
import itemRouter from "./routes/item.routes.js";
import orderRouter from "./routes/order.routes.js";
import http from "http";
import { Server } from "socket.io";
import { socketHandler } from "./socket.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://vingo-8syd.onrender.com",
    credentials: true,
    methods: ["POST", "GET"],
  },
});

app.set("io", io);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://vingo-8syd.onrender.com",
    credentials: true,
  }),
);
const port = process.env.PORT || 3000;

//connect to mongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);
app.use("/api/item", itemRouter);
app.use("/api/order", orderRouter);

socketHandler(io);

server.listen(port, () => {
  console.log(`Server started at ${port}`);
});
