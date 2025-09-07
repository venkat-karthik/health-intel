import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Health prediction types
export const diseaseSchema = z.object({
  name: z.string(),
  riskLevel: z.enum(["High", "Medium", "Low"]),
  caseCount: z.number(),
  symptoms: z.array(z.string()),
  precautions: z.array(z.string()),
});

export const healthPredictionSchema = z.object({
  region: z.string(),
  month: z.string(),
  diseases: z.array(diseaseSchema),
});

export const predictionRequestSchema = z.object({
  region: z.string(),
  month: z.string(),
});

export type Disease = z.infer<typeof diseaseSchema>;
export type HealthPrediction = z.infer<typeof healthPredictionSchema>;
export type PredictionRequest = z.infer<typeof predictionRequestSchema>;
