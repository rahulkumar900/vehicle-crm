import express from "express";
const router = express.Router();
import {
  createApplication,
  getApplication,
  applicationById,
  updateApplication,
  deleteApplication,
} from "../controller/application.controller";

router
  .route("/application/:appId")
  .get(applicationById)
  .put(updateApplication)
  .delete(deleteApplication);
router.route("/application").get(getApplication).post(createApplication);

export default router;
