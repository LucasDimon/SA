import { Sequelize } from 'sequelize';
import 'dotenv/config'; 

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("ERRO: DATABASE_URL não definida no arquivo .env");
  throw new Error('DATABASE_URL not defined');
}

export const conexao = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Define como true se quiser ver os SQLs no console
  dialectOptions: {
    ssl: {
      require: true,
      // Essa linha é CRUCIAL para o Supabase e evita o erro "self-signed certificate"
      rejectUnauthorized: false 
    }
  },
  // Ajuste de timezone (opcional, mas recomendado para BR)
  timezone: '-03:00',
});