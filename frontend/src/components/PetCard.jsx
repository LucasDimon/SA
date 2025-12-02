import React from 'react';
import { Link } from 'react-router-dom';
export default function PetCard({ pet }) {
  return (
    <div className="pet-card">
      <img src={pet.foto ? `${import.meta.env.VITE_API_URL}${pet.foto}` : '/src/assets/placeholder.png'} alt={pet.nome} />
      <div className="pet-info">
        <h3><Link to={`/animals/${pet.id}`}>{pet.nome}</Link></h3>
        <div className="meta"><span>{pet.idade||'—'}</span><span>{pet.sexo||'—'}</span><span>{pet.porte||'—'}</span></div>
      </div>
      <div className="pet-actions"><Link to={`/animals/${pet.id}`} className="btn">Ver</Link></div>
    </div>
  );
}
