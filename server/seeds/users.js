import 'dotenv/config';
import bcrypt from 'bcryptjs';

export const up = (db) => {
  const superAdminEmail = process.env.SUPERADMIN_EMAIL;
  const superAdminPassword = process.env.SUPERADMIN_PASSWORD;
  const superAdminFirstName = process.env.SUPERADMIN_FIRSTNAME;
  const superAdminLastName = process.env.SUPERADMIN_LASTNAME;

  if (!superAdminEmail || !superAdminPassword || !superAdminFirstName || !superAdminLastName) {
    throw new Error('Missing environment variables for superadmin.');
  }

  // Check if the superadmin already exists
  const existingUser = db
    .prepare(`SELECT * FROM users WHERE email = ?`)
    .get(superAdminEmail);

  if (existingUser) {
    console.log(`Superadmin already exists with email: ${superAdminEmail}`);
    return;
  }

  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
  const hashedPassword = bcrypt.hashSync(superAdminPassword, saltRounds);

  db.prepare(`
    INSERT INTO users (email, password, firstName, lastName, role, isActive)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(superAdminEmail, hashedPassword, superAdminFirstName, superAdminLastName, 'superadmin', 1);

  console.log(`Superadmin created with email: ${superAdminEmail}`);
};
