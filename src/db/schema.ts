import { relations, sql } from "drizzle-orm";
import {
  serial,
  varchar,
  text,
  timestamp,
  pgTable,
  uuid,
  primaryKey,
  uniqueIndex,
  AnyPgColumn,
  integer,
} from "drizzle-orm/pg-core";

export const applications = pgTable("application", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const sites = pgTable("sites", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name").notNull(),
  parentId: integer("parent_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    password: varchar("password", { length: 256 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (users) => {
    return {
      idIndex: uniqueIndex("users_id_index").on(users.id),
    };
  }
);

export const app_user = pgTable("app_user", {
  id: uuid("id").defaultRandom().notNull(),
  first_name: varchar("first_name", { length: 256 }).notNull(),
  last_name: varchar("last_name", { length: 256 }).notNull(),
  address: text("address"),
  email: varchar("email").notNull(),
  mobile: integer("number"),
  state: varchar("state").notNull(),
  country: varchar("country", { length: 256 }).notNull(),
});

export const roles = pgTable(
  "roles",
  {
    id: uuid("id").defaultRandom().notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    Permissions: text("permissions").array().$type<Array<String>>(),
    createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .notNull(),
  },

  (roles) => {
    return {
      idIndex: uniqueIndex("roles_id_index").on(roles.id),
    };
  }
);
