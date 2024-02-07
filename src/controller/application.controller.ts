import { InferInsertModel, InferModel } from "drizzle-orm";
import { db } from "../db";
import { users,applications } from "../db/schema";
import { Request, Response } from 'express';
import { string, z } from "zod";
const applicationSchema = z.object({
    name: z.string().min(1),
});

export const createApplication = async (req: Request, res: Response): Promise<void> => {
    try {
        // Validate request body
        const name = applicationSchema.parse(req.body);
      const insertedData = await db.insert(applications).values(name).returning();
        res.status(201).json(insertedData[0]);
    } catch (err) {
        console.error('Error creating user:', err);
        if (err instanceof z.ZodError) {
            res.status(400).json({ message: err.errors });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};