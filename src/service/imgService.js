import { openDb } from "../configDB.js";
import multer from "multer";
import sharp from "sharp";

// Configurar multer para armazenar a imagem no buffer e definir limites de tamanho
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.size < 1024) {
      // Verifica se o tamanho do arquivo é pelo menos 1KB
      return cb(new Error("Arquivo muito pequeno! Tamanho mínimo é de 1KB."));
    }
    cb(null, true);
  },
}).single("img");

// redimencionar o tamanho da imagem de 100x100
const resizeImage = async (buffer) => {
  return await sharp(buffer).resize(100, 100).toBuffer();
};

// Tratamento de erro de imagem
const errorTreat = (err) => {
  let errorMessage = err.message;
  if (err.code === "LIMIT_FILE_SIZE") {
    errorMessage =
      "Limite de tamanho do arquivo excedido! Tamanho máximo permitido é 5MB.";
  } else if (err.message.startsWith("Arquivo muito pequeno!")) {
    errorMessage =
      "Tamanho do arquivo é muito pequeno. Tamanho mínimo permitido é 1KB.";
  }
  return errorMessage;
};

export { upload, errorTreat, resizeImage };
