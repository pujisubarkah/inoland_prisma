import { defineEventHandler, readBody } from "#imports";
import { getUserFromSession } from "../utils/auth";
import { db } from "../database";
import { ide_inovasi } from "../database/schema/ide_inovasi";

// POST /api/ide_inovasi
export default defineEventHandler(async (event) => {
  if (event.method !== "POST") {
    return { error: "Method not allowed" };
  }
  const body = await readBody(event);
  const user = await getUserFromSession(event);
  if (!user) {
    return { error: "Unauthorized" };
  }
  
  // Gunakan created_by dari body jika ada, atau dari session
  const finalData = {
    ...body,
    created_by: body.created_by || user.id,
  };
  
  const result = await db.insert(ide_inovasi).values(finalData);
  return { success: true, result };
});
