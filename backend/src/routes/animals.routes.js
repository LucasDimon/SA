import { Router } from "express";
import multer from "multer";
import {
  listAnimals,
  getAnimal,
  createAnimal,
  updateAnimal,
  deleteAnimal,
} from "../controllers/animalController.js";
import { authRequired, adminRequired } from "../middleware/auth.js";

const upload = multer({ dest: "/tmp/uploads/" }); // << TROQUEI AQUI

const router = Router();

router.get("/", listAnimals);
router.get("/:id", getAnimal);
router.post("/", authRequired, upload.single("foto"), createAnimal);
router.put("/:id", authRequired, upload.single("foto"), updateAnimal);
router.delete("/:id", authRequired, adminRequired, deleteAnimal);

export default router;

