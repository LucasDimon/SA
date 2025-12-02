import { Pet } from "../models/Pet.js";

export async function criarPet(req, res) {
  try {
    const dados = req.body;

    if (!dados.nome || !dados.especie || !dados.idade || !dados.sexo || !dados.porte) {
      return res.status(400).json({ error: "Campos obrigatórios não enviados." });
    }

    const pet = await Pet.create({
      ...dados,
      imagem: req.file ? `/uploads/${req.file.filename}` : null,
    });

    res.status(201).json({ message: "Pet cadastrado!", pet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao cadastrar pet." });
  }
}

export async function listarPets(req, res) {
  try {
    const pets = await Pet.findAll();
    res.json(pets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar pets." });
  }
}
