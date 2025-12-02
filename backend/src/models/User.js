import { DataTypes } from 'sequelize';
import { conexao } from '../database.js';

export const User = conexao.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  senha_hash: { type: DataTypes.STRING, allowNull: false },
  data_nascimento: { type: DataTypes.DATEONLY, allowNull: true },
  role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'user' },
  status_usuario: { type: DataTypes.STRING, allowNull: false, defaultValue: 'ativo' }
}, { tableName: 'users', timestamps: true });
