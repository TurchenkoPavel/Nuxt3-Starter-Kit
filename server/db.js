import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';

const db = new Database('database.db', { verbose: console.log });
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL, 
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    avatar TEXT NULLABLE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Проверка и создание суперадмина
const checkAndCreateSuperAdmin = async () => {
  const superAdminEmail = process.env.SUPERADMIN_EMAIL;
  const superAdminPassword = process.env.SUPERADMIN_PASSWORD;
  const superAdminFirstName = process.env.SUPERADMIN_FIRSTNAME;
  const superAdminLastName = process.env.SUPERADMIN_LASTNAME;

  const user = db.prepare(`SELECT * FROM users WHERE email = ?`).get(superAdminEmail);

  if (!user) {
    const hashedPassword = await bcrypt.hash(superAdminPassword, saltRounds);
    db.prepare(`
      INSERT INTO users (email, password, firstName, lastName, role)
      VALUES (?, ?, ?, ?, ?)
    `).run(superAdminEmail, hashedPassword, superAdminFirstName, superAdminLastName, 'superadmin');

    console.log(`Superadmin created with email: ${superAdminEmail}`);
  } else {
    console.log('Superadmin already exists');
  }
};

// Вызываем функцию проверки
checkAndCreateSuperAdmin();
export default db;
