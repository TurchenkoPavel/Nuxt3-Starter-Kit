import db from '~/server/db';

export default defineEventHandler(async () => {
  try {
    const users = db.prepare(`SELECT * FROM users WHERE isActive = 1`).all();
    return users;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw createError({ statusCode: 500, message: 'Failed to fetch users' });
  }
});