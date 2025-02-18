import db from '~/server/db';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const result = db.prepare(`
      INSERT INTO sales (user_id, product_id, quantity, client_id, status_id, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `).run(body.user_id, body.product_id, body.quantity, body.client_id, body.status_id);
    return { success: true, message: 'Sale created successfully', saleId: result.lastInsertRowid };
  } catch (error) {
    console.error('Failed to create sale:', error);
    throw createError({ statusCode: 500, message: 'Failed to create sale' });
  }
}); 