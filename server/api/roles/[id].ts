import { db } from '../../database';
import { role } from '../../database/schema/role';
import { getRouterParam, getMethod, readBody } from 'h3';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);
  const idParam = getRouterParam(event, 'id');
  const id = Number(idParam);

  if (isNaN(id)) {
    return {
      statusCode: 400,
      message: 'ID tidak valid',
    };
  }

  if (method === 'GET') {
    const result = await db.select().from(role).where(eq(role.id, id));
    if (result.length === 0) {
      return {
        statusCode: 404,
        message: 'Role tidak ditemukan',
      };
    }
    return {
      statusCode: 200,
      data: result[0],
    };
  }

  if (method === 'PUT') {
    const body = await readBody(event);
    const { nama } = body;

    await db.update(role).set({ role_name: nama }).where(eq(role.id, id));
    return {
      statusCode: 200,
      message: 'Role berhasil diperbarui',
    };
  }

  if (method === 'DELETE') {
    await db.delete(role).where(eq(role.id, id));
    return {
      statusCode: 200,
      message: 'Role berhasil dihapus',
    };
  }

  return {
    statusCode: 405,
    message: 'Metode tidak diizinkan',
  };
});
