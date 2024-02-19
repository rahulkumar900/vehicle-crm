import express, { Request, Response } from "express";
const router = express.Router();
import {
  allRole,
  createRole,
  deleteRole,
  roleById,
  updateRole,
} from "../controller/roles.controller";

router.route("/roles").get(allRole).post(createRole);
router.route("/roles/:roleId").get(roleById).put(updateRole).delete(deleteRole);

export default router;
