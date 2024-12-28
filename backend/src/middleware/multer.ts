import multer from "multer";
import path from "path";

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

export default upload;
