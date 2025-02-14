import db from '~/server/db';

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const body = await readBody(event);

  try {
    const result = db.prepare(`
      UPDATE sales_statuses
      SET name = ?, editor_id = ?
      WHERE id = ?
    `).run(body.name, body.editor_id, id);

    if (result.changes === 0) {
      throw createError({ statusCode: 404, message: 'Status not found' });
    }      

    return { message: 'Status updated successfully' };
  } catch (error) {
    console.error('Failed to update status:', error);
    throw createError({ statusCode: 500, message: 'Failed to update status' });
  }
});