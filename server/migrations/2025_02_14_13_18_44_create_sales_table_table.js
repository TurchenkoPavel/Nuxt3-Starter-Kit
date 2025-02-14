export const up = (db) => {
   db.exec(`CREATE TABLE sales (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          product_id INTEGER,
          quantity INTEGER,
          client_id INTEGER,
          status_id INTEGER,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`);
};

export const down = (db) => {
  db.exec(`DROP TABLE sales;`);
};
