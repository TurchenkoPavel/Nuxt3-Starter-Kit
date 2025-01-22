import fs from 'fs';
import path from 'path';

// Parse command-line arguments (skip any prepended flags like `--name`)
const rawArgs = process.argv.slice(2).filter(arg => !arg.startsWith('--'));
const migrationName = rawArgs[0]; // Treat the first argument after filtering as the migration name

console.log('Raw arguments:', rawArgs);
console.log('Migration name:', migrationName);

if (!migrationName || typeof migrationName !== 'string' || migrationName.trim() === '') {
  console.error('Error: Please provide a valid migration name.');
  process.exit(1);
}

// Set up the directory and file name
const rootDir = process.cwd();
const migrationsDir = path.join(rootDir, 'server/migrations');
if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir, { recursive: true });
}

// Generate the timestamp
const now = new Date();
const formattedDate = `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, '0')}_${String(now.getDate()).padStart(2, '0')}`;
const formattedTime = `${String(now.getHours()).padStart(2, '0')}_${String(now.getMinutes()).padStart(2, '0')}_${String(now.getSeconds()).padStart(2, '0')}`;
const timestamp = `${formattedDate}_${formattedTime}`;

// Format the filename
const fileName = `${timestamp}_${migrationName}_table.js`;
const filePath = path.join(migrationsDir, fileName);

// Migration template
const template = `export const up = (db) => {
  // Add your migration logic here
  // Example: db.exec(\`CREATE TABLE ${migrationName} (...);\`);
};

export const down = (db) => {
  // Add your rollback logic here
  // Example: db.exec(\`DROP TABLE ${migrationName};\`);
};
`;

// Write the template to the file
fs.writeFileSync(filePath, template);
console.log(`Migration file created: ${fileName}`);
