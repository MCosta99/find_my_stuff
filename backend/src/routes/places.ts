import { Router } from "express";
import db from "../db";

// Definiamo un tipo per il risultato della query COUNT
interface CountResult {
  count: number;
}

const router = Router();

// Ottieni tutti i luoghi
router.get("/", (req, res) => {
  db.all("SELECT * FROM places", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Aggiungi un nuovo luogo
router.post("/", (req, res) => {
  const { name } = req.body;
  const query = `INSERT INTO places (name) VALUES (?)`;
  db.run(query, [name], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: this.lastID });
    }
  });
});

// Elimina un luogo
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  // Verifica se ci sono oggetti associati al luogo
  db.get(
    "SELECT COUNT(*) AS count FROM items WHERE location = ?",
    [id],
    (err, row: CountResult) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (row.count > 0) {
        // Se ci sono oggetti associati, non possiamo eliminare il luogo
        return res
          .status(400)
          .json({ error: "Non puoi eliminare un luogo con oggetti associati" });
      }

      // Se non ci sono oggetti associati, eliminiamo il luogo
      const query = `DELETE FROM places WHERE id = ?`;
      db.run(query, [id], function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json({ deleted: this.changes });
        }
      });
    }
  );
});

export default router;
