import db from '~/server/db';

export default defineEventHandler(async (event) => {

  const { id } = event.context.params;
  const body = await readBody(event);
  
  try {
    const result = db.prepare(`
      UPDATE users
      SET email = ?, role = ?, firstName = ?, lastName = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(body.email.value, body.role.value, body.firstName.value, body.lastName.value, id);

    if (result.changes === 0) {
      throw createError({ statusCode: 404, message: 'User not found' });
    }

    return { message: 'User updated successfully' };
  } catch (error) {
    console.error('Failed to update user:', error);
    throw createError({ statusCode: 500, message: 'Failed to update user' });
  }
});