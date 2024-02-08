import { eq } from "drizzle-orm";

export const create = async (db: any, model: any, data: {}) => {
  return await db.insert(model).values(data).returning(model);
};

export const getById = async (db: any, model: any, refid: string) => {
  return db.select().from(model).where(eq(model.id, refid));
};
