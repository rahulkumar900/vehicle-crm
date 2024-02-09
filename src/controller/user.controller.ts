import { PgSchema, PgUUID, uuid } from "drizzle-orm/pg-core";
import { db } from "../db";
import { users } from "../db/schema";
import { Request, Response } from "express";
import { string, z } from "zod";
import { eq } from "drizzle-orm";
import { getById, create } from "./utils";

const userSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password must be less than 50 characters long" })
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d\s]).{8,}$/, {
      message:
        "Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
    }),
  name: z.string().min(1),
  applicationId: string().uuid(),
});

const userIdSchema = z
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

export const createUser = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const newUser = userSchema.parse(req.body);

    // const insertedData = await db.insert(users).values(newUser).returning();
    const insertedData = await create(db, users, newUser);
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

export const allUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await db.select().from(users);
    // const result  = await db.query.users.findMany();
    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const userById = async (req: Request, res: Response) => {
  try {
    const reqUserId = userIdSchema.parse(req.params.userId);
    const result = await getById(db, users, reqUserId);
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

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = userIdSchema.parse(req.params.userId);
    const newUser: {
      id?: string;
      name?: string;
      email?: string;
      password?: string;
    } = req.body;
    console.log(req.body, userId);
    const updatedUser = await db
      .update(users)
      .set(newUser)
      .where(eq(users.id, userId))
      .returning();
    res
      .status(200)
      .json({ data: updatedUser, message: "User Updated SuccessFully" });
  } catch (err) {
    console.error("Error creating user:", err);
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: err.errors[0].message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
