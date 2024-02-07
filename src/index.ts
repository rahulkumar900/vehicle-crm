// src/index.ts
import express from 'express';
import bodyParser from 'body-parser';
import userRoute from "./routes/user.routes";
import applicationRoute from "./routes/application.roures";
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}))

app.use("/api",userRoute);
app.use("/api",applicationRoute);

app.get('/', (req, res) => {
  res.send('Hello, Express with TypeScript!');
});



export default app;
