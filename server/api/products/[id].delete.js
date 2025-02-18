import db from '~/server/db';

export default defineEventHandler(async (event) => {

  const { id } = event.context.params;
  try {
    const result = db.prepare(`UPDATE products SET is_active = 0 WHERE id = ?`).run(id);
    if (result.changes === 0) {
      throw createError({ statusCode: 404, message: 'Product not found' });
    }
    return { message: 'Product deleted successfully' };
  } catch (error) {
    console.error('Failed to delete product:', error);
    throw createError({ statusCode: 500, message: 'Failed to delete product' });
  }
})