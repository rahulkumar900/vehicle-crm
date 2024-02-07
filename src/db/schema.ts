import { sql } from "drizzle-orm";
import { serial, varchar, text, timestamp, pgTable, uuid, primaryKey, uniqueIndex } from "drizzle-orm/pg-core";

export const applications = pgTable("application", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).defaultNow().notNull(),

})

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    applicationId: uuid("applicationId").notNull().references(() => applications.id),
    password: varchar("password", { length: 256 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (users) => {
    return {
      pk: primaryKey({ columns: [users.email, users.applicationId] }),
      pkWithCustomName: primaryKey({ name: 'users_cpk', columns: [users.email, users.applicationId] }),
      idIndex: uniqueIndex("users_id_index").on(users.id),
    };
  }
);



export const roles = pgTable("roles",
  {
    id: uuid("id").defaultRandom().notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    applicationId: uuid("applicationId").references(() => applications.id),
    Permissions: text("permissions").array().$type<Array<String>>(),
    createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).defaultNow().notNull(),

  },

  (roles) => {
    return {
      cpk: primaryKey({ columns: [roles.name, roles.applicationId] }),
      idIndex: uniqueIndex("roles_id_index").on(roles.id),
    };
  }
) 


