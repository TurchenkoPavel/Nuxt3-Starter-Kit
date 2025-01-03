import db from '~/server/db';

export default defineEventHandler(async (event) => {

  const userId = event.context.params.id; // Extract the user ID from the URL

  try {
    const result = db.prepare(`DELETE FROM users WHERE id = ?`).run(userId);

    if (result.changes === 0) {
      throw createError({
        statusCode: 404,
        message: 'User not found',
      });
    }

    return { success: true, message: 'User deleted successfully' };
  } catch (error) {
    console.error('Error deleting user:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to delete user',
    });
  }
});