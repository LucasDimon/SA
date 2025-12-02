import { DataTypes } from 'sequelize';
import { conexao } from '../database.js';

export const Adoption = conexao.define('Adoption', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  animal_id: { type: DataTypes.INTEGER, allowNull: false },
  nome_completo: { type: DataTypes.STRING, allowNull: false },
  residencia_fixa: { type: DataTypes.BOOLEAN, allowNull: false },
  teve_pet_antes: { type: DataTypes.BOOLEAN, allowNull: false },
  ja_adotou_antes: { type: DataTypes.BOOLEAN, allowNull: false },
  pode_buscar: { type: DataTypes.BOOLEAN, allowNull: false },
  telefone_contato: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'pendente' },
  observacoes: { type: DataTypes.TEXT, allowNull: true }
}, { tableName: 'adoptions', timestamps: true });
