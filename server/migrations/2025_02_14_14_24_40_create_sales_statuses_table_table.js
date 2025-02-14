export const up = (db) => {
  db.exec(`CREATE TABLE sales_statuses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      editor_id INTEGER,
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`
  );
};

export const down = (db) => {
  db.exec(`DROP TABLE sales_statuses;`);
};
