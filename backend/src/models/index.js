import { User } from './User.js';
import { Animal } from './Animal.js';
import { Adoption } from './Adoption.js';
// 1. Importar o modelo Pet
import { Pet } from './pet.js'; 

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

// Nota: O modelo 'Pet' (para o Admin cadastrar manualmente) 
// por enquanto não tem relação obrigatória com User, 
// mas você pode adicionar no futuro se quiser saber quem cadastrou.

// 2. Exportar todos os modelos, INCLUINDO Pet
export { User, Animal, Adoption, Pet };
