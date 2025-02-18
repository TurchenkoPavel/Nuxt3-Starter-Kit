export const up = (db) => {
  db.exec(`CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price INTEGER NOT NULL,
    currency TEXT NOT NULL,
    is_active BOOLEAN DEFAULT 1,
    editor_id INTEGER,
    discount INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP  
  );`);
};

export const down = (db) => {
  db.exec(`DROP TABLE products;`);
};
