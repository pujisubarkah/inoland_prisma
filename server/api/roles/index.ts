import { db } from '../../database';
import { role } from '../../database/schema/role';
import { readBody, getMethod } from 'h3';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === 'GET') {
    const roles = await db.select().from(role);
    return {
      statusCode: 200,
      data: roles,
    };
  }

  if (method === 'POST') {
    const body = await readBody(event);
    const { role_name } = body;

    if (!role_name) {
      return {
        statusCode: 400,
        message: 'Field "role_name" tidak boleh kosong',
      };
    }

    const result = await db.insert(role).values({ role_name }).returning();
    return {
      statusCode: 201,
      message: 'Role berhasil ditambahkan',
      data: result[0],
    };
  }

  return {
    statusCode: 405,
    message: 'Metode tidak diizinkan',
  };
});
