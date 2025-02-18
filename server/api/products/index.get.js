import db from '~/server/db';

export default defineEventHandler(async () => {

  /*
  
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
  */
  try {
    const products = db.prepare(
      `SELECT p.*, 
          json_object(
            'id', u.id, 
            'firstName', u.firstName,
            'lastName', u.lastName,
            'avatar', u.avatar,
            'email', u.email, 
            'role', u.role
          ) AS user
      FROM products p
      LEFT JOIN users u ON u.id = p.editor_id
      WHERE p.is_active = 1;`
    ).all();

    products.forEach( (product) => {
      product.user = JSON.parse(product.user);
    })

    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);    
    throw createError({ statusCode: 500, message: 'Failed to fetch products' });
  }
});