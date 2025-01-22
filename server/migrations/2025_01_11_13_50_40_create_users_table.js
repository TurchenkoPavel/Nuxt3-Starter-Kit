export const up = (db) => {
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
};

export const down = (db) => {
  // Add your rollback logic here
  db.exec(`DROP TABLE users;`);
};

