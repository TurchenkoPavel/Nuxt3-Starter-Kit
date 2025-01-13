import jwt from 'jsonwebtoken';
import db from '~/server/db';

export default defineEventHandler((event) => {
  try {
    // Извлекаем токен из cookies
    const token = getCookie(event, '__bs');
    if (!token) {
      throw createError({ statusCode: 401, message: 'No token provided' });
    }

    // Проверяем токен и декодируем его
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Получаем информацию о пользователе из базы данных
    const user = db.prepare(`SELECT * FROM users WHERE id = ? AND isActive = 1`).get(decoded.id);

    if (!user) {
      throw createError({ statusCode: 404, message: 'User not found' });
    }

    // Возвращаем данные пользователя
    return user;
  } catch (error) {
    console.error('Error in getMe:', error);
    if (error.statusCode) {
      throw error; // Если это ошибка, созданная через createError, пробрасываем её дальше
    } else {
      throw createError({ statusCode: 500, message: 'Internal server error' });
    }
  }
});
