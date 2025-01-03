import db from '~/server/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Проверяем, переданы ли email и password
  if (!body.email || !body.password) {
    throw createError({ statusCode: 400, message: 'Email and password are required' });
  }

  try {
    // Ищем пользователя в базе данных
    const user = db.prepare(`SELECT * FROM users WHERE email = ?`).get(body.email);

    // Проверяем наличие пользователя и валидность пароля
    if (!user) {
      throw createError({ statusCode: 401, message: 'Invalid credentials: User not found' });
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      throw createError({ statusCode: 401, message: 'Invalid credentials: Incorrect password' });
    }

    // Создаём JWT-токен
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Устанавливаем токен в HttpOnly cookie
    setCookie(event, '__bs', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 день
      sameSite: 'strict',
    });

    return { success: true, message: 'Login successful', user: { 
      email: user.email, 
      role: user.role, 
      firstName: user.firstName, 
      lastName: user.lastName, 
      avatar: user.avatar  
    }};
  } catch (error) {
    if (error.statusCode) {
      throw error; // Перебрасываем ошибки, созданные через createError
    } else {
      console.error('Unexpected error during login:', error);
      throw createError({ statusCode: 500, message: 'Internal server error' });
    }
  }
});
