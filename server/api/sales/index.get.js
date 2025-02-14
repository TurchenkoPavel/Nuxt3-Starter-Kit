import db from '~/server/db';

export default defineEventHandler(async () => {
  try {
    const sales = db.prepare(`SELECT * FROM sales`).all();
    return sales;
  } catch (error) {
    console.error('Failed to fetch sales:', error);
    throw createError({ statusCode: 500, message: 'Failed to fetch sales' });
  }
});