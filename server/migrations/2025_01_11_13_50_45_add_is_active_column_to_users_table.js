export const up = (db) => {
  db.exec(`
    ALTER TABLE users
    ADD COLUMN isActive BOOLEAN DEFAULT 1
  `);
};

export const down = (db) => {
  // Create a temporary table without the `isActive` column
  db.exec(`
    CREATE TABLE users_temp AS
    SELECT id, email, password, role, firstName, lastName, avatar, created_at, updated_at
    FROM users;
  `);

  // Drop the original table
  db.exec(`DROP TABLE users;`);

  // Rename the temporary table back to the original name
  db.exec(`ALTER TABLE users_temp RENAME TO users;`);
};