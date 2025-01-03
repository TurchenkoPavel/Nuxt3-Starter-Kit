import db from '~/server/db';

export default defineEventHandler(async (event) => {

  const { id } = event.context.params;
  try {
    const user = db.prepare(`SELECT * FROM users WHERE id = ?`).get(id);
    if (!user) {
      throw createError({ statusCode: 404, message: 'User not found' });
    }
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw createError({ statusCode: 500, message: 'Failed to fetch user' });
  }
});