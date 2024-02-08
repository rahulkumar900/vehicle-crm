import { db } from "../db";
import { applications } from "../db/schema";
import { Request, Response } from "express";
import { create, getById } from "./utils";
import { string, z } from "zod";
const applicationSchema = z.object({
  name: z.string().min(1),
});

const reqTdSchema = z
  .string()
  .refine(
    (value) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        value
      ),
    {
      message: "Invalid userId UUID format",
    }
  );

export const createApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Validate request body
    const name = applicationSchema.parse(req.body);
    const insertedData = await create(db, applications, name);
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

export const applicationById = async (req: Request, res: Response) => {
  try {
    const reqId = reqTdSchema.parse(req.params.userId);
    const result = await getById(db, applications, reqId);
    console.log(result);
    if (result.length < 1) {
      return res.status(400).json({
        data: [],
        message: "User Not Found",
      });
    }
    res
      .status(200)
      .json({ data: result, message: "User fetched Successfully" });
  } catch (err) {
    console.error("Error creating user:", err);
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: err.errors[0].message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const getApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await db.select().from(applications);
    // const result  = await db.query.users.findMany();
    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
