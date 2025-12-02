import React, { useEffect, useState } from 'react';
import api from '../api/api';
import CategoryButton from '../components/CategoryButton';
import PetCard from '../components/PetCard';

const categories = [
  { label: 'Cão', color: '#2d8cf0' },
  { label: 'Gato', color: '#8a4ef0' },
  { label: 'Cavalo', color: '#f08a2d' }
];

export default function Home() {
  const [active, setActive] = useState(null);
  const [pets, setPets] = useState([]);
  const [counts, setCounts] = useState({});

  // carrega todos os animais
  useEffect(() => {
    async function load() {
      try {
        const res = await api.get('/animals');
        setPets(res.data);

        const c = {};
        res.data.forEach(p => {
          c[p.especie] = (c[p.especie] || 0) + 1;
        });
        setCounts(c);
      } catch (e) {
        console.error('Erro ao carregar pets', e);
      }
    }
    load();
  }, []);

  // carrega filtrados
  useEffect(() => {
    async function loadFiltered() {
      try {
        const query = active ? `?especie=${active}` : "";
        const res = await api.get(`/animals${query}`);
        setPets(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    loadFiltered();
  }, [active]);

  return (
    <div className="home-page">
      <section className="hero">
        <h1>Encontre seu Novo Amigo ❤️</h1>
        <p>Adote um pet e mude uma vida!</p>
      </section>

      <section className="categories container">
        <h2>Escolha o Tipo de Pet</h2>
        <div className="cats-row">
          {categories.map(cat => (
            <CategoryButton
              key={cat.label}
              label={cat.label}
              color={cat.color}
              count={counts[cat.label] || 0}
              active={active === cat.label}
              onClick={() => setActive(active === cat.label ? null : cat.label)}
            />
          ))}
        </div>
      </section>

      <section className="pets container">
        <h2>Pets Disponíveis</h2>

        <div className="pets-list">
          {pets.length === 0 && <p>Nenhum pet encontrado.</p>}

          {pets.map(pet => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </section>
    </div>
  );
}
