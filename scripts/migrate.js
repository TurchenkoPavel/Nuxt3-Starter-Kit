import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import minimist from 'minimist';
import db from '../server/db.js';

const args = minimist(process.argv.slice(2), {
  boolean: ['with-seeds'], // Add a flag for seeds
  default: { 'with-seeds': false },
});

const migrationsDir = path.join(process.cwd(), 'server/migrations');

const runMigrations = async () => {
  try {
    console.log('Checking and running migrations...');

    // Ensure the `migrations` table exists
    db.exec(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        run_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Get the list of applied migrations
    const appliedMigrations = db.prepare(`SELECT name FROM migrations`).all().map(row => row.name);

    // Read migration files
    const files = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.js'))
      .filter(file => !appliedMigrations.includes(file)) // Exclude already applied migrations
      .sort(); // Ensure consistent order

    if (files.length === 0) {
      console.log('No new migrations to apply.');
    } else {
      // Apply each pending migration
      for (const file of files) {
        const migrationPath = path.join(migrationsDir, file);
        const migration = await import(migrationPath);

        try {
          db.transaction(() => {
            console.log(`Applying migration: ${file}`);
            migration.up(db);
            db.prepare(`INSERT INTO migrations (name) VALUES (?)`).run(file);
          })();
          console.log(`Migration applied successfully: ${file}`);
        } catch (err) {
          console.error(`Failed to apply migration: ${file}`, err);
          throw err;
        }
      }
    }

    console.log('All migrations applied.');

    // Run seeds if the flag is provided
    if (args['with-seeds']) {
      console.log('Applying seeds...');
      execSync('npm run db:seeds', { stdio: 'inherit' });
    }
  } catch (err) {
    console.error('Error running migrations:', err);
  }
};

runMigrations();
