import jwt from 'jsonwebtoken';
import { defineEventHandler, parseCookies } from 'h3'


export default defineEventHandler((event) => {
  const { __bs } = parseCookies(event)
  if (!__bs) {
    return { authorized: false }; // Пользователь не авторизован
  }
  try {
    // Проверяем токен
    const decoded = jwt.verify(__bs, process.env.JWT_SECRET);
    return { authorized: true, user: decoded }; // Пользователь авторизован
  } catch (error) {
    console.error('Invalid token:', error);
    return { authorized: false }; // Невалидный токен
  }
});