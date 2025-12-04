import { Router } from "express";
import multer from "multer";
import { criarPet, listarPets } from "../controllers/petController.js";

const router = Router();

// Config upload - usa /tmp, que é gravável no Vercel
const upload = multer({
  dest: "/tmp/uploads/"
});

// Rotas
router.get("/", listarPets);
router.post("/", upload.single("imagem"), criarPet);

export default router;
