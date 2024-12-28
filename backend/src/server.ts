import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import itemsRouter from "./routes/items";
import placesRouter from "./routes/places";

const app = express();
const port = 3001;

// Configurazione di multer per il caricamento dei file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Cartella dove salvare i file
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Estensione del file
    const filename = Date.now() + ext; // Nome unico per ogni immagine
    cb(null, filename);
  },
});

const upload = multer({ storage });

app.use((req, res, next) => {
  console.log("Request URL:", req.url); // Log della richiesta
  next();
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/", express.static(path.resolve(__dirname, "..", "public")));
app.use("/uploads", express.static("uploads")); // Serve le immagini dalla cartella "uploads"

// Rotte
app.use("/items", itemsRouter);
app.use("/places", placesRouter);

// Se il server non trova una risorsa, restituisce l'index.html di Vite
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "public", "index.html"));
});

// Avvio del server
app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});
