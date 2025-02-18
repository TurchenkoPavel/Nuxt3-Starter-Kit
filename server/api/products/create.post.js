import db from '~/server/db';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const result = db.prepare(`
      INSERT INTO products (name, description, price, quantity, currency, editor_id, discount )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(body.name.value, body.description.value, body.price.value, body.quantity.value, body.currency.value, body.editor_id, body.discount.value);
    return { success: true, message: 'Product created successfully', productId: result.lastInsertRowid };
  } catch (error) {
    console.error('Failed to create product:', error);
    throw createError({ statusCode: 500, message: 'Failed to create product' });
  }
});