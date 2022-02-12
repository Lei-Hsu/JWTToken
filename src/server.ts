import express from "express";
const mongoose = require("mongoose");

// read the env file
require("dotenv").config();

// routes
const userRouter = require("./routes/userRouter");

const app = express();

const port = process.env.PORT || 3000

// middleware
app.use(express.json()) // 解析 req.body
app.use(express.urlencoded({ extended: false })) // 可以用 form urlencoded 帶 body

// connect to mongodb
const dbUrl = process.env.DB_URL;
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => console.log(`Sever started on port ${port}`));
    console.log("connected tp db");
  })
  .catch((err: any) => console.log(err));

// user routes
app.use("/user", userRouter);
