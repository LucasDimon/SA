import { User } from './User.js';
import { Animal } from './Animal.js';
import { Adoption } from './Adoption.js';

// relations
User.hasMany(Animal, { foreignKey: 'usuario_responsavel' });
Animal.belongsTo(User, { foreignKey: 'usuario_responsavel' });

User.hasMany(Adoption, { foreignKey: 'user_id' });
Adoption.belongsTo(User, { foreignKey: 'user_id' });

Animal.hasMany(Adoption, { foreignKey: 'animal_id' });
Adoption.belongsTo(Animal, { foreignKey: 'animal_id' });

export { User, Animal, Adoption };
