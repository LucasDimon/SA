import { DataTypes } from 'sequelize';
import { conexao } from '../database.js';

export const Animal = conexao.define('Animal', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  especie: { type: DataTypes.STRING, allowNull: false },
  raca: { type: DataTypes.STRING, allowNull: true },
  porte: { type: DataTypes.STRING, allowNull: true },
  sexo: { type: DataTypes.STRING, allowNull: true },
  idade: { type: DataTypes.STRING, allowNull: true },
  descricao: { type: DataTypes.TEXT, allowNull: true },
  status_adocao: { type: DataTypes.STRING, allowNull: false, defaultValue: 'disponivel' },
  data_resgate: { type: DataTypes.DATEONLY, allowNull: true },
  foto: { type: DataTypes.STRING, allowNull: true },
  usuario_responsavel: { type: DataTypes.INTEGER, allowNull: true }
}, { tableName: 'animals', timestamps: true });
