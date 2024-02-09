import { applications } from "./../db/schema";
import { db } from "./../db/index";
import { eq } from "drizzle-orm";
import { PgTableWithColumns } from "drizzle-orm/pg-core";

export const create = async (db: any, model: any, data: {}) => {
  return await db.insert(model).values(data).returning(model);
};

export const getById = async (db: any, model: any, refid: string) => {
  return db.select().from(model).where(eq(model.id, refid));
};

export const update = async (db: any, model: any, data: {}, refid: string) => {
  return await db
    .update(model)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(model.id, refid))
    .returning();
};

export const destroy = async (db: any, model: any, refid: string) => {
  return await db.delete(applications).where(eq(model.id, refid)).returning();
};
