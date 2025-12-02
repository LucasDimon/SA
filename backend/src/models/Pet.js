import { DataTypes } from "sequelize";
import { conexao } from "../database.js";

export const Pet = conexao.define("Pet", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  nome: { type: DataTypes.STRING, allowNull: false },
  especie: { type: DataTypes.STRING, allowNull: false }, // Cão, Gato, Cavalo
  idade: { type: DataTypes.STRING, allowNull: false },
  sexo: { type: DataTypes.STRING, allowNull: false }, // Macho / Fêmea
  porte: { type: DataTypes.STRING, allowNull: false }, // Pequeno / Médio / Grande
  descricao: { type: DataTypes.TEXT },

  vacinado: { type: DataTypes.BOOLEAN, defaultValue: false },
  castrado: { type: DataTypes.BOOLEAN, defaultValue: false },

  imagem: { type: DataTypes.STRING }, // URL da imagem
});
