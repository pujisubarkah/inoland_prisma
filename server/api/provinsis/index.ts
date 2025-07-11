// server/api/provinsis/index.ts

import { db } from '../../database';
import { provinsis } from '../../database/schema/provinsis';

export default defineEventHandler(async (event) => {
  try {
    const data = await db.select().from(provinsis);
    
    // Return data langsung tanpa wrapper
    return data;
    
  } catch (error) {
    console.error('Gagal ambil data provinsi:', error);
    
    // Throw error untuk ditangani oleh Nuxt error handler
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Gagal mengambil data provinsi'
    });
  }
});
