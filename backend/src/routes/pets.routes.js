import { Router } from "express";
import multer from "multer";
import { criarPet, listarPets } from "../controllers/petController.js";

const router = Router();

// Config upload
const upload = multer({
  dest: "uploads/"
});

// Rotas
router.get("/", listarPets);
router.post("/", upload.single("imagem"), criarPet);

export default router;
