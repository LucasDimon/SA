import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET || 'drs';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '1d';

export const register = async (req, res) => {
  try {
    const { nome, email, senha, data_nascimento } = req.body || {};
    if (!nome || !email || !senha) return res.status(400).json({ error: 'nome, email e senha são obrigatórios' });
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(409).json({ error: 'E-mail já cadastrado' });
    const senha_hash = await bcrypt.hash(senha, 10);
    const user = await User.create({ nome, email, senha_hash, data_nascimento });
    return res.status(201).json({ id: user.id, nome: user.nome, email: user.email, role: user.role });
  } catch (e) { console.error(e); res.status(500).json({ error: 'Erro interno' }); }
};

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body || {};
    if (!email || !senha) return res.status(400).json({ error: 'email e senha são obrigatórios' });
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });
    const ok = await bcrypt.compare(senha, user.senha_hash);
    if (!ok) return res.status(401).json({ error: 'Credenciais inválidas' });
    const token = jwt.sign({ role: user.role }, JWT_SECRET, { subject: String(user.id), expiresIn: JWT_EXPIRES });
    return res.json({ message: 'Login ok', token, user: { id: user.id, nome: user.nome, email: user.email, role: user.role } });
  } catch (e) { console.error(e); res.status(500).json({ error: 'Erro interno' }); }
};
