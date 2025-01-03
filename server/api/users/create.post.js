import db from '~/server/db';
import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event) => {

  const body = await readBody(event);
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);

  try {
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);

    const result = db.prepare(`
      INSERT INTO users (email, password, role, firstName, lastName)
      VALUES (?, ?, ?, ?, ?)
    `).run(body.email, hashedPassword, body.role, body.firstName, body.lastName);

    return { success: true, message: 'User registered successfully', userId: result.lastInsertRowid };
  } catch (error) {
    console.error('Database error:', error); // Log the error for debugging

    throw createError({
      statusCode: 500,
      message: error,
    });
  }
});