import React from 'react';
import { Link } from 'react-router-dom';

const placeholder = '/src/assets/placeholder.png';

export default function PetCard({ pet }) {
  // escolhe o src da imagem
  const src = pet.imagem && pet.imagem.trim().length > 0
    ? pet.imagem
    : placeholder;

  return (
    <div className="pet-card">
      <img
        src={src}
        alt={pet.nome}
        className="pet-card__image"
        onError={(e) => {
          // se o link estiver quebrado, cai pro placeholder
          e.target.onerror = null;
          e.target.src = placeholder;
        }}
      />

      <div className="pet-info">
        <h3>
          <Link to={`/animals/${pet.id}`}>{pet.nome}</Link>
        </h3>

        <div className="meta">
          <span>{pet.idade || '—'} ano(s)</span>
          <span>{pet.sexo || '—'}</span>
          <span>{pet.porte || '—'}</span>
        </div>
      </div>

      <div className="pet-actions">
        <Link to={`/animals/${pet.id}`} className="btn">
          Ver
        </Link>
      </div>
    </div>
  );
}
