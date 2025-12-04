import { Sequelize } from 'sequelize';
import 'dotenv/config'; 
import pg from 'pg'; // Importação obrigatória para o Vercel

const DATABASE_URL = process.env.DATABASE_URL;

// Verifica se a URL existe
if (!DATABASE_URL) {
  throw new Error('DATABASE_URL not defined no .env');
}

// AQUI ESTÁ A CORREÇÃO: "export const conexao"
// O erro acontecia porque essa palavra "export" ou "const" podia estar faltando
export const conexao = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  dialectModule: pg, // Força o uso do módulo pg
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  },
  timezone: '-03:00',
});