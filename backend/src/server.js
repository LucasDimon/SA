import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';

// Importação da conexão (caminho corrigido)
import { conexao } from './database.js';

// Importação dos modelos
import { User, Animal, Adoption, Pet } from './models/index.js';

// Importação das rotas
import authRoutes from './routes/auth.routes.js';
import animalsRoutes from './routes/animals.routes.js';
import adoptionRoutes from './routes/adoption.routes.js';
import petsRoutes from './routes/pets.routes.js';

const app = express();

// Configuração de CORS
const allowed = (process.env.CORS_ORIGINS || '*')
  .split(',')
  .map(s => s.trim());

app.use(cors({ origin: allowed.includes('*') ? true : allowed }));

// Middlewares para JSON e arquivos estáticos
app.use(express.json());
app.use('/uploads', express.static(path.resolve('src/uploads')));

// Rota de verificação de saúde (Health check)
app.get('/health', (req, res) => res.json({ ok: true, at: new Date().toISOString() }));

// Definição das Rotas
app.use('/auth', authRoutes);
app.use('/animals', animalsRoutes);
app.use('/adoptions', adoptionRoutes);
app.use('/pets', petsRoutes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro interno:', err);
  res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
});

// Inicialização do Servidor e Banco de Dados
const port = process.env.PORT || 3001;

(async () => {
  try {
    // 1. Testar conexão
    await conexao.authenticate();
    console.log('Conexão com o banco estabelecida.');

    // 2. Sincronizar tabelas
    // VOLTAMOS PARA 'alter: true' AGORA QUE TUDO FUNCIONA!
    // Assim você não perde os dados quando reiniciar.
    
    await User.sync({ alter: true });
    await Animal.sync({ alter: true });
    await Pet.sync({ alter: true });
    await Adoption.sync({ alter: true });

    console.log('Tabelas sincronizadas com sucesso.');

    // 3. Iniciar servidor
    app.listen(port, () => console.log(`API rodando em http://localhost:${port}`));
  } catch (e) {
    console.error('Erro ao conectar/sincronizar DB:', e);
    process.exit(1);
  }
})();