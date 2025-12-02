import { Adoption, Animal } from '../models/index.js';

export const createAdoptionRequest = async (req, res) => {
  try {
    const { animal_id, nome_completo, residencia_fixa, teve_pet_antes, ja_adotou_antes, pode_buscar, telefone_contato, observacoes } = req.body || {};
    if (!animal_id || !nome_completo || !telefone_contato) return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    const animal = await Animal.findByPk(animal_id);
    if (!animal) return res.status(404).json({ error: 'Animal não encontrado' });
    if (animal.status_adocao !== 'disponivel') return res.status(400).json({ error: 'Animal não disponível' });
    const adoption = await Adoption.create({
      user_id: req.user.id,
      animal_id,
      nome_completo,
      residencia_fixa: !!residencia_fixa,
      teve_pet_antes: !!teve_pet_antes,
      ja_adotou_antes: !!ja_adotou_antes,
      pode_buscar: !!pode_buscar,
      telefone_contato,
      observacoes
    });
    res.status(201).json({ message: 'Solicitação enviada. O administrador entrará em contato pelo WhatsApp.', adoption });
  } catch (e) { console.error(e); res.status(500).json({ error: 'Erro ao criar solicitação' }); }
};

export const listAdoptionsAdmin = async (req, res) => {
  try {
    const list = await Adoption.findAll({ order: [['createdAt', 'DESC']] });
    res.json(list);
  } catch (e) { console.error(e); res.status(500).json({ error: 'Erro ao listar adoções' }); }
};

export const updateAdoptionStatus = async (req, res) => {
  try {
    const adoption = await Adoption.findByPk(req.params.id);
    if (!adoption) return res.status(404).json({ error: 'Solicitação não encontrada' });
    const { status } = req.body;
    if (!['pendente','aprovado','negado'].includes(status)) return res.status(400).json({ error: 'Status inválido' });
    adoption.status = status;
    await adoption.save();
    res.json(adoption);
  } catch (e) { console.error(e); res.status(500).json({ error: 'Erro ao atualizar solicitação' }); }
};
