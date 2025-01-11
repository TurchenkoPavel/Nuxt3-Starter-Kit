import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';


// Resolve __dirname for ES modules

const rootDir = process.cwd();

const db = new Database('database.db', { verbose: console.log });  
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);

db.exec(`
  CREATE TABLE IF NOT EXISTS migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    run_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Apply migrations
const runMigrations = async () => {
  const migrationsDir = path.join(rootDir, 'server/migrations');
  const appliedMigrations = db.prepare(`SELECT name FROM migrations`).all().map(row => row.name);

  const files = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.js'))
    .filter(file => !appliedMigrations.includes(file));

  for (const file of files) {
    const migrationPath = path.join(migrationsDir, file);
    const migration = await import(migrationPath); // Use dynamic import for ES modules
    db.transaction(() => { 
      migration.up(db); // Run the migration
      db.prepare(`INSERT INTO migrations (name) VALUES (?)`).run(file); // Record the migration
    })();
    console.log(`Migration applied: ${file}`);
  }
};

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
runMigrations();
checkAndCreateSuperAdmin();

export default db;
