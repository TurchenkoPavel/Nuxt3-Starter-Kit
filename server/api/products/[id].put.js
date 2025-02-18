import db from '~/server/db';

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const body = await readBody(event);
  try {
    const result = db.prepare(`
      UPDATE products
      SET name = ?, description = ?, price = ?, quantity = ?, currency = ?, editor_id = ?, discount = ?
      WHERE id = ?      
    `).run(body.name.value, body.description.value, body.price.value, body.quantity.value, body.currency.value, body.editor_id, body.discount.value, id);

    if (result.changes === 0) {
      throw createError({ statusCode: 404, message: 'Product not found' });
    }  

    return { message: 'Product updated successfully' };
  } catch (error) {
    console.error('Failed to update product:', error);
    throw createError({ statusCode: 500, message: 'Failed to update product' });
  }
});