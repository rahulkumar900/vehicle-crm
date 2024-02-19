import { db } from "../db";
import { roles } from "../db/schema";
import { Request, Response } from "express";
import { z } from "zod";
import { create, destroy, getById, update } from "./utils";
import { alias } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";
const roleSchema = z.object({
  name: z.string().min(1, "Name should not be empty"),
});

export const allRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await db.query.roles.findMany();
    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const newUser = roleSchema.parse(req.body);

    const insertedData = await create(db, roles, newUser);

    res.status(201).json(insertedData);
  } catch (err) {
    console.error("Error creating user:", err);
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: err.errors });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const roleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.roleId;
    const result = await getById(db, roles, id);

    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    // Validate request body
    // const newUser = roleSchema.parse(req.body);
    const id: string = req.params.roleId;
    const newRole = req.body;
    const result = await getById(db, roles, id);
    if (result.length < 1) {
      res
        .status(200)
        .json({ message: "Invalid User Data or Roles Not Found " });
      return;
    }
    const updatedRole = await update(db, roles, newRole, id);
    res.status(201).json({
      data: updatedRole,
      message: "Data Updated SuccessFully",
    });
  } catch (err) {
    console.error("Error creating user:", err);
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: err.errors });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
export const deleteRole = async (req: Request, res: Response) => {
  try {
    // Validate request body
    // const newUser = roleSchema.parse(req.body);
    const id: string = req.params.roleId;
    const result = await getById(db, roles, id);
    if (result.length < 1) {
      res
        .status(200)
        .json({ message: "Invalid User Data or Roles Not Found " });
      return;
    }
    const deletedRole = await destroy(db, roles, id);
    res.status(201).json({
      data: deletedRole,
      message: "Data Deleted  SuccessFully",
    });
  } catch (err) {
    console.error("Error creating user:", err);
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: err.errors });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
