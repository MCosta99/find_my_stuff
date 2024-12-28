import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("Errore durante la connessione al database:", err.message);
  } else {
    console.log("Connesso al database SQLite.");
  }
});

// Creazione delle tabelle
db.serialize(() => {
  // Tabella items con il campo image
  db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      category TEXT,
      location INTEGER,
      image TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (location) REFERENCES places(id)
    )
  `);

  // Tabella places
  db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
  `);
});

export default db;
