import { Sequelize } from 'sequelize';
import 'dotenv/config'; 
import pg from 'pg'; // Importação obrigatória para o Vercel

import { Sequelize } from 'sequelize';
import 'dotenv/config';
import pg from 'pg';
import dns from 'dns'; // 👈 novo import

// força o Node a usar IPv4 primeiro nas resoluções DNS
dns.setDefaultResultOrder('ipv4first');

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL not defined no .env');
}

export const conexao = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  dialectModule: pg,
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  timezone: '-03:00',
});
