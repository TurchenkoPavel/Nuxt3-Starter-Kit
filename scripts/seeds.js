import path from 'path';
import fs from 'fs';
import db from '../server/db.js';

const seedsDir = path.join(process.cwd(), 'server/seeds');

(async () => {
  try {
    console.log('Checking and applying seeds...');

    // Read seed files
    const files = fs.readdirSync(seedsDir)
      .filter(file => file.endsWith('.js'))
      .sort(); // Ensure consistent order

    if (files.length === 0) {
      console.log('No seed files found.');
      return;
    }

    // Apply each seed
    for (const file of files) {
      const seedPath = path.join(seedsDir, file);
      const seed = await import(seedPath);

      try {
        db.transaction(() => {
          console.log(`Checking and applying seed: ${file}`);
          seed.up(db); // Execute the seed logic
        })();
        console.log(`Seed applied successfully: ${file}`);
      } catch (err) {
        console.error(`Failed to apply seed: ${file}`, err);
        throw err; // Stop further seeds if one fails
      }
    }

    console.log('All seeds applied.');
  } catch (err) {
    console.error('Error applying seeds:', err);
  }
})();
