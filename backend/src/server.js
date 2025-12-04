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
// Permite que o frontend (Vercel) converse com o backend
const allowed = (process.env.CORS_ORIGINS || '*')
  .split(',')
  .map(s => s.trim());

app.use(cors({ origin: allowed.includes('*') ? true : allowed }));

// --- Middlewares ---
app.use(express.json());
// Nota: Uploads locais não persistem no Vercel (servidor apaga arquivos temporários).
// Para produção real, recomenda-se usar Supabase Storage.
app.use('/uploads', express.static(path.resolve('src/uploads')));

// --- Rota de Saúde (Importante para debug) ---
app.get('/health', (req, res) => res.json({ 
  status: 'ok', 
  env: process.env.NODE_ENV || 'development',
  timestamp: new Date().toISOString() 
}));

// --- Rotas da Aplicação ---
app.use('/auth', authRoutes);
app.use('/animals', animalsRoutes);
app.use('/adoptions', adoptionRoutes);
app.use('/pets', petsRoutes);

// --- Tratamento de Erros ---
app.use((err, req, res, next) => {
  console.error('Erro interno:', err);
  res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
});

// --- Inicialização do Banco de Dados ---
const initDB = async () => {
  try {
    // Tenta autenticar a conexão
    await conexao.authenticate();
    console.log('Conexão com o banco estabelecida.');

    // Sincronização de Tabelas
    // IMPORTANTE: Só executamos o sync({ alter: true }) em desenvolvimento.
    // Em produção (Vercel), isso deixa a requisição lenta e pode causar erro 500.
    if (process.env.NODE_ENV !== 'production') {
      console.log('Ambiente de desenvolvimento detectado: Sincronizando tabelas...');
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

// Executa a conexão (sem travar a inicialização do Vercel)
initDB();

// --- Exportação para Vercel ---
// O Vercel precisa que o app seja exportado
export default app;

// --- Inicialização Local ---
// Só abre a porta 3001 se estivermos rodando localmente (node src/server.js)
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`API rodando localmente em http://localhost:${port}`);
  });
}