import { Router } from "express";
import db from "../db";
import upload from "../middleware/multer"; // Importa il middleware multer

const router = Router();

// Ottieni tutti gli oggetti
router.get("/", (req, res) => {
  db.all("SELECT * FROM items", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Aggiungi un nuovo oggetto con immagine
router.post("/", upload.single("image"), (req, res) => {
  const { name, description, category, location } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null; // Se è stato caricato un file immagine, salviamo il percorso

  const query = `INSERT INTO items (name, description, category, location, image) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [name, description, category, location, image], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: this.lastID });
    }
  });
});

// Elimina un oggetto
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM items WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ deleted: this.changes });
    }
  });
});

export default router;
