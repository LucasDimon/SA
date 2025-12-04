import { Sequelize } from 'sequelize';
import 'dotenv/config'; 
import pg from 'pg'; // <--- IMPORTANTE: Importamos o driver manualmente

import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

try {
  await sequelize.authenticate();
  console.log("✅ Conectado ao banco com sucesso!");
} catch (error) {
  console.error("❌ Erro fatal ao conectar no banco:", error);
}

export default sequelize;
