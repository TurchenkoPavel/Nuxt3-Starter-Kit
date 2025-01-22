import db from '../server/db.js';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();

(async () => {
  try {
    const migrationsDir = path.join(rootDir, 'server/migrations');
    const appliedMigrations = db.prepare(`SELECT name FROM migrations ORDER BY id DESC`).all();

    for (const { name } of appliedMigrations) {
      const migrationPath = path.join(migrationsDir, name);
      const migration = await import(migrationPath);
      db.transaction(() => {
        migration.down(db);
        db.prepare(`DELETE FROM migrations WHERE name = ?`).run(name);
      })();
      console.log(`Migration reverted: ${name}`);
    }

    console.log('All migrations reverted.');
  } catch (err) {
    console.error('Error resetting migrations:', err);
  }
})();