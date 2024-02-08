import express from "express";
const router = express.Router();
import {
  createApplication,
  getApplication,
} from "../controller/application.controller";

router.route("/application").get(getApplication).post(createApplication);

export default router;
