import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Use a placeholder URL at build time so the module initialises without
// throwing. Actual queries will never run during static page collection.
const connectionUrl =
  process.env.DATABASE_URL ??
  "postgresql://build-placeholder:placeholder@build-placeholder.neon.tech/placeholder";

const sql = neon(connectionUrl);
export const db = drizzle(sql, { schema });
