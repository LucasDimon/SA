import { Animal } from '../models/index.js';
import { Op } from 'sequelize';

export const listAnimals = async (req, res) => {
  try {
    const { especie, q } = req.query;
    const where = { status_adocao: 'disponivel' };
    if (especie) where.especie = { [Op.iLike]: especie };
    if (q) where[Op.or] = [
      { nome: { [Op.iLike]: `%${q}%` } },
      { descricao: { [Op.iLike]: `%${q}%` } }
    ];
    const list = await Animal.findAll({ where, order: [['createdAt', 'DESC']] });
    res.json(list);
  } catch (e) { console.error(e); res.status(500).json({ error: 'Erro ao listar animais' }); }
};

export const getAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (!animal) return res.status(404).json({ error: 'Animal não encontrado' });
    res.json(animal);
  } catch (e) { console.error(e); res.status(500).json({ error: 'Erro ao buscar animal' }); }
};

export const createAnimal = async (req, res) => {
  try {
    const { nome, especie, raca, porte, sexo, idade, descricao } = req.body || {};
    const foto = req.file ? `/uploads/${req.file.filename}` : null;
    if (!nome || !especie) return res.status(400).json({ error: 'nome e especie são obrigatórios' });
    const animal = await Animal.create({ nome, especie, raca, porte, sexo, idade, descricao, foto, usuario_responsavel: req.user.id });
    res.status(201).json(animal);
  } catch (e) { console.error(e); res.status(500).json({ error: 'Erro ao criar animal' }); }
};

export const updateAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (!animal) return res.status(404).json({ error: 'Animal não encontrado' });
    const allowed = ['admin'];
    if (String(animal.usuario_responsavel) !== String(req.user.id) && !allowed.includes(req.user.role)) {
      return res.status(403).json({ error: 'Sem permissão' });
    }
    const updates = req.body || {};
    if (req.file) updates.foto = `/uploads/${req.file.filename}`;
    await animal.update(updates);
    res.json(animal);
  } catch (e) { console.error(e); res.status(500).json({ error: 'Erro ao atualizar animal' }); }
};

export const deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (!animal) return res.status(404).json({ error: 'Animal não encontrado' });
    await animal.destroy();
    res.json({ message: 'Animal removido' });
  } catch (e) { console.error(e); res.status(500).json({ error: 'Erro ao remover animal' }); }
};
