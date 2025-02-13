import jwt from 'jsonwebtoken';
import db from '~/server/db';
import { defineEventHandler, parseCookies } from 'h3'

export default defineEventHandler((event) => {
  try {
    // Извлекаем токен из cookies
    const { __bs } = parseCookies(event)
    if (!__bs) {
      throw createError({ statusCode: 401, message: 'No token provided' });
    }

    // Проверяем токен и декодируем его
    const decoded = jwt.verify(__bs, process.env.JWT_SECRET);

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
