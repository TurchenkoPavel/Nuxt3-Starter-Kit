import db from '~/server/db';

export default defineEventHandler(async (event) => {

  const body = await readBody(event);

  try {
    const result = db.prepare(`
      INSERT INTO sales_statuses (name, editor_id)
      VALUES (?, ?)
    `).run(body.name, body.editor_id);

    return { 
      success: true, 
      message: 'Status created successfully', 
      statusId: result.lastInsertRowid 
    };
  } catch (error) {
    console.error('Failed to create statuses:', error);
    throw createError({ statusCode: 500, message: 'Failed to create statuses' });
  }
});