import { Sequelize } from 'sequelize';
import 'dotenv/config';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error('DATABASE_URL not defined');

export const conexao = new Sequelize(DATABASE_URL, { dialect: 'postgres', logging: false });
