import db from '../server/db.js';
import path from 'path';
import fs from 'fs';
import minimist from 'minimist';

// Parse command-line arguments
const args = minimist(process.argv.slice(2), {
  default: { step: 1 },
  alias: { s: 'step' },
});

const rootDir = process.cwd();
const migrationsDir = path.join(rootDir, 'server/migrations');
let steps = parseInt(args.step, 10);

if (isNaN(steps) || steps <= 0) {
  steps = 1
}

(async () => {
  try {
    console.log(`Reverting the last ${steps} migration(s)...`);

    // Fetch the last applied migrations (ordered by most recent)
    const appliedMigrations = db
      .prepare(`SELECT name FROM migrations ORDER BY id DESC LIMIT ?`)
      .all(steps);

    if (appliedMigrations.length === 0) {
      console.log('No migrations to revert.');
      return;
    }

    for (const { name } of appliedMigrations) {
      const migrationPath = path.join(migrationsDir, name);

      // Check if the migration file exists before importing
      if (!fs.existsSync(migrationPath)) {
        console.warn(`Migration file not found: ${name}. Skipping.`);
        db.prepare(`DELETE FROM migrations WHERE name = ?`).run(name);
        continue;
      }

      const migration = await import(migrationPath);

      try {
        // Run the down function and remove the migration record
        db.transaction(() => {
          console.log(`Reverting migration: ${name}`);
          migration.down(db); // Revert the migration
          db.prepare(`DELETE FROM migrations WHERE name = ?`).run(name);
        })();
        console.log(`Migration reverted: ${name}`);
      } catch (err) {
        console.error(`Error reverting migration: ${name}`, err);
        throw err; // Stop further reverts if one fails
      }
    }

    console.log(`Successfully reverted ${appliedMigrations.length} migration(s).`);
  } catch (err) {
    console.error('Error reverting migrations:', err);
  }
})();
