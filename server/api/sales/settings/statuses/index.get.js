import db from '~/server/db';

export default defineEventHandler(async () => {
  try {
    const statuses = db.prepare(`
      SELECT s.*, 
             json_object(
               'id', u.id, 
               'firstName', u.firstName,
               'lastName', u.lastName,
               'avatar', u.avatar,
               'email', u.email, 
               'role', u.role
             ) AS user
      FROM sales_statuses s
      LEFT JOIN users u ON u.id = s.editor_id
      WHERE s.is_active = 1;
    `).all();

    statuses.forEach((status) => {
      status.user = JSON.parse(status.user);
    })
    return statuses;
  } catch (error) {
    console.error('Failed to fetch statuses:', error);
    throw createError({ statusCode: 500, message: 'Failed to fetch statuses' });
  }
});