import { Sequelize } from "sequelize";
import "dotenv/config";
import pg from "pg";
import dns from "dns"; // novo import

// Força o Node a resolver DNS usando IPv4 primeiro (ajuda no Render)
dns.setDefaultResultOrder("ipv4first");

const DATABASE_URL = process.env.DATABASE_URL;

// Verifica se a URL existe
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL not defined no .env");
}

export const conexao = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  timezone: "-03:00",
});
