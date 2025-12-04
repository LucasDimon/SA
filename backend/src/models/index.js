import { User } from './User.js';
import { Animal } from './Animal.js';
import { Adoption } from './Adoption.js';

// CORREÇÃO AQUI: Mudamos de './pet.js' para './Pet.js' (com P maiúsculo)
// Certifique-se que o arquivo na pasta models se chama "Pet.js" mesmo.
import { Pet } from './Pet.js'; 

// --- Definição das Relações ---

// Usuário pode ser responsável por vários Animais (doação/resgate)
User.hasMany(Animal, { foreignKey: 'usuario_responsavel' });
Animal.belongsTo(User, { foreignKey: 'usuario_responsavel' });

// Usuário pode fazer várias solicitações de Adoção
User.hasMany(Adoption, { foreignKey: 'user_id' });
Adoption.belongsTo(User, { foreignKey: 'user_id' });

// Um Animal pode ter várias solicitações de Adoção
Animal.hasMany(Adoption, { foreignKey: 'animal_id' });
Adoption.belongsTo(Animal, { foreignKey: 'animal_id' });

export { User, Animal, Adoption, Pet };