export const up = (db) => {
  db.exec(`
    ALTER TABLE users
    ADD COLUMN isActive BOOLEAN DEFAULT 1
  `);
};