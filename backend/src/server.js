// backend/src/server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { conexao } from './database.js';

// rotas
import authRoutes from './routes/auth.routes.js';
import animalsRoutes from './routes/animals.routes.js';
import adoptionRoutes from './routes/adoption.routes.js';
import petsRoutes from './routes/pets.routes.js'; // <- rota de pets (cadastro/listagem)

const app = express();

// CORS
const allowed = (process.env.CORS_ORIGINS || '*')
  .split(',')
  .map(s => s.trim());
app.use(cors({ origin: allowed.includes('*') ? true : allowed }));

// corpo JSON e uploads estáticos
app.use(express.json());
app.use('/uploads', express.static(path.resolve('src/uploads')));

// health
app.get('/health', (req, res) => res.json({ ok: true, at: new Date().toISOString() }));

// montar rotas
app.use('/auth', authRoutes);
app.use('/animals', animalsRoutes);
app.use('/adoptions', adoptionRoutes);
app.use('/pets', petsRoutes); // <-- aqui está a rota que você pediu

// tratamento básico de erro
app.use((err, req, res, next) => {
  console.error('Erro interno:', err);
  res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
});

// start + sincroniza DB
const port = process.env.PORT || 3001;
(async () => {
  try {
    await conexao.authenticate();
    await conexao.sync({ alter: true });
    console.log('Conectado ao DB e sincronizado');
    app.listen(port, () => console.log(`API rodando em http://localhost:${port}`));
  } catch (e) {
    console.error('Erro ao conectar/sincronizar DB', e);
    process.exit(1);
  }
})();
