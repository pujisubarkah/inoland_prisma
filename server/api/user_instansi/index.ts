import { user_instansi } from '../../database/schema/user_instansi';
import { user } from '../../database/schema/user';
import { db } from '../../database';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    // Get all user_instansi records with join ke table users untuk email dan instansi
    const result = await db.select({
      id: user_instansi.id,
      user_id: user_instansi.user_id,
      contact_person: user_instansi.contact_person,
      telp: user_instansi.telp,
      created_by: user_instansi.created_by,
      nama_opd: user_instansi.OPD, // alias OPD menjadi nama_opd
      email: user.email, // ambil email dari table users
      instansi: user.instansi // ambil instansi dari table users
    })
    .from(user_instansi)
    .leftJoin(user, eq(user_instansi.user_id, user.id));
    
    console.log('[GET /api/user_instansi] result:', result);
    return result;
  }

  if (event.req.method === 'POST') {
    const body = await readBody(event);
    console.log('[POST /api/user_instansi] received body:', JSON.stringify(body));
    console.log('[POST /api/user_instansi] body:', body);
    
    // Transaction: create user, then user_instansi
    const result = await db.transaction(async (trx) => {
      // Ambil data admin yang login untuk mendapatkan instansi
      const [adminUser] = await trx.select().from(user).where(eq(user.id, body.created_by));
      if (!adminUser) {
        throw new Error('Admin user not found');
      }
      console.log('[POST] Admin user instansi:', adminUser.instansi);
      
      // Hash password dengan bcrypt
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(body.password, saltRounds);
      console.log('[POST] Password hashed with bcrypt');
      
      // Insert user dengan role_id otomatis 2 dan instansi dari admin
      const [newUser] = await trx.insert(user).values({
        nama_lengkap: body.contact_person, // nama_lengkap dari contact_person
        email: body.email,
        password: hashedPassword, // gunakan password yang sudah di-hash
        is_verified: true,
        created_at: new Date().toISOString(),
        username: body.email,
        role_id: 2, // otomatis role_id 2
        instansi: adminUser.instansi, // instansi mengikuti admin yang login
      }).returning();
      
      console.log('[POST] New user created with ID:', newUser.id);
      console.log('[POST] User instansi set to:', newUser.instansi);
      
      // Insert user_instansi
      const [newUserInstansi] = await trx.insert(user_instansi).values({
        user_id: newUser.id, // user_id dari user yang baru dibuat (auto increment)
        contact_person: body.contact_person,
        telp: body.telp,
        created_by: body.created_by, // created_by dari user yang login (53)
        OPD: body.nama_opd, // nama OPD dari form disimpan ke field OPD
      }).returning();
      
      console.log('[POST] New user_instansi created with values:');
      console.log('- user_id:', newUser.id);
      console.log('- contact_person:', body.contact_person);
      console.log('- telp:', body.telp);
      console.log('- created_by:', body.created_by);
      console.log('- OPD (nama_opd):', body.nama_opd);
      console.log('- email dari user table:', newUser.email);
      console.log('- instansi dari admin:', adminUser.instansi);
      
      return { user: newUser, user_instansi: newUserInstansi };
    });
    console.log('[POST /api/user_instansi] result:', result);
    return result;
  }

  // Method not allowed
  event.res.statusCode = 405;
  return { error: 'Method not allowed' };
});
