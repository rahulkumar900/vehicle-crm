// src/index.ts
import express from "express";
import bodyParser from "body-parser";
import userRoute from "./routes/user.routes";
import applicationRoute from "./routes/application.roures";
import siteRoute from "./routes/site.routes";
import roleRoute from "./routes/role.routes";
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", userRoute);
app.use("/api", applicationRoute);
app.use("/api", siteRoute);
app.use("/api", roleRoute);

app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript!");
});

export default app;
