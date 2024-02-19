import { db } from "../db";
import { sites } from "../db/schema";
import { Request, Response } from "express";
import { z } from "zod";
import { create, destroy, getById, update } from "./utils";
import { alias } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";
const siteSchema = z.object({
  name: z.string().min(1, "Name should not be empty"),
  parentId: z.string().nullable().optional(),
});

export const allSite = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await db.query.sites.findMany();
    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createSite = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const newUser = siteSchema.parse(req.body);

    const insertedData = await create(db, sites, newUser);

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

export const siteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.siteId;
    const result = await getById(db, sites, id);

    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateSite = async (req: Request, res: Response) => {
  try {
    // Validate request body
    // const newUser = siteSchema.parse(req.body);
    const id: string = req.params.siteId;
    const newSite = req.body;
    const result = await getById(db, sites, id);
    if (result.length < 1) {
      res
        .status(200)
        .json({ message: "Invalid User Data or Sites Not Found " });
      return;
    }
    const updatedSite = await update(db, sites, newSite, id);
    res.status(201).json({
      data: updatedSite,
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
export const deleteSite = async (req: Request, res: Response) => {
  try {
    // Validate request body
    // const newUser = siteSchema.parse(req.body);
    const id: string = req.params.siteId;
    const result = await getById(db, sites, id);
    if (result.length < 1) {
      res
        .status(200)
        .json({ message: "Invalid User Data or Sites Not Found " });
      return;
    }
    const deletedSite = await destroy(db, sites, id);
    res.status(201).json({
      data: deletedSite,
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
