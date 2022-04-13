import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import exampleRoute from "./routes/exampleRoute";
import authRoute from "./routes/authRoute";

const app = express();

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", exampleRoute);
app.use("/api/auth/", authRoute);

const port = process.env.PORT ?? 8000;
const server = app.listen(port, () => {
  return console.log(`🚀 Server ready at: http://localhost:${port}`);
});
