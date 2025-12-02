import 'dotenv/config';
import { conexao } from '../database.js';
import { User, Animal } from '../models/index.js';
import bcrypt from 'bcryptjs';

(async () => {
  try {
    await conexao.authenticate();
    await conexao.sync({ alter: true });

    const adminEmail = 'admin@petadote.local';
    const existing = await User.findOne({ where: { email: adminEmail } });
    if (!existing) {
      const senha_hash = await bcrypt.hash('admin123', 10);
      await User.create({ nome: 'Admin', email: adminEmail, senha_hash, role: 'admin' });
      console.log('Admin created:', adminEmail);
    } else console.log('Admin already exists');

    const count = await Animal.count();
    if (count === 0) {
      await Animal.bulkCreate([
        { nome: 'Rex', especie: 'Cão', raca: 'SRD', porte: 'Médio', sexo: 'Macho', idade: '2 anos', descricao: 'Cão muito carinhoso', foto: null },
        { nome: 'Mia', especie: 'Gato', raca: 'SRD', porte: 'Pequeno', sexo: 'Fêmea', idade: '1 ano', descricao: 'Gata brincalhona', foto: null },
        { nome: 'Spirit', especie: 'Cavalo', raca: 'Puro', porte: 'Grande', sexo: 'Macho', idade: '4 anos', descricao: 'Cavalo forte', foto: null }
      ]);
      console.log('Sample animals created');
    } else console.log('Animals already present');
    process.exit(0);
  } catch (e) { console.error(e); process.exit(1); }
})();
