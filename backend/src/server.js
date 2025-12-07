import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';

// Importação da conexão
import { conexao } from './database.js';

// Importação dos modelos
import { User, Animal, Adoption, Pet } from './models/index.js';

// Importação das rotas
import authRoutes from './routes/auth.routes.js';
import animalsRoutes from './routes/animals.routes.js';
import adoptionRoutes from './routes/adoption.routes.js';
import petsRoutes from './routes/pets.routes.js';

const app = express();

// --- Configuração de CORS ---
const allowed = (process.env.CORS_ORIGINS || '*')
  .split(',')
  .map(s => s.trim());

app.use(cors({ origin: allowed.includes('*') ? true : allowed }));

// --- Middlewares ---
app.use(express.json());
app.use('/uploads', express.static(path.resolve('src/uploads')));

// --- Rota de Saúde ---
app.get('/health', (req, res) => res.json({
  status: 'ok',
  env: process.env.NODE_ENV || 'development',
  timestamp: new Date().toISOString()
}));

// --- Rotas ---
app.use('/auth', authRoutes);
app.use('/animals', animalsRoutes);
app.use('/adoptions', adoptionRoutes);
app.use('/pets', petsRoutes);

// --- Tratamento de Erros Globais ---
app.use((err, req, res, next) => {
  console.error('Erro interno:', err);
  res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
});

// --- Inicialização do Banco ---
const initDB = async () => {
  try {
    await conexao.authenticate();
    console.log('Conexão com o banco estabelecida.');

    if (process.env.NODE_ENV !== 'production') {
      console.log('Sincronizando tabelas no ambiente de desenvolvimento...');
      await User.sync({ alter: true });
      await Animal.sync({ alter: true });
      await Pet.sync({ alter: true });
      await Adoption.sync({ alter: true });
      console.log('Tabelas sincronizadas.');
    }
  } catch (e) {
    console.error('Erro fatal ao conectar no banco:', e);
  }
};

initDB();

// --- Inicialização do Servidor (Render + Local) ---
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});

export default app;
