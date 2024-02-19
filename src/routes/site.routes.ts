import express, { Request, Response } from "express";
const router = express.Router();
import {
  allSite,
  createSite,
  deleteSite,
  siteById,
  updateSite,
} from "../controller/sites.controller";

router.route("/sites").get(allSite).post(createSite);
router.route("/sites/:siteId").get(siteById).put(updateSite).delete(deleteSite);

export default router;
