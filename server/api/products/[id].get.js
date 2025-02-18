import db from "~/server/db";

export default defineEventHandler(async (event) => {  
  const { id } = event.context.params;
  try {
    const product = db.prepare(`SELECT * FROM products WHERE id = ?`).get(id);
    if (!product) {
      throw createError({ statusCode: 404, message: 'Product not found' });
    }
    return product;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    throw createError({ statusCode: 500, message: 'Failed to fetch product' });
  }
});