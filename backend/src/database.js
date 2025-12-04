import { Sequelize } from 'sequelize';
import 'dotenv/config'; 
import pg from 'pg'; // <--- IMPORTANTE: Importamos o driver manualmente

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("ERRO: DATABASE_URL não definida no arquivo .env");
  throw new Error('DATABASE_URL not defined');
}

export const conexao = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  // Essa linha abaixo é OBRIGATÓRIA para Vercel/Serverless
  dialectModule: pg, 
  
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  },
  timezone: '-03:00',
});