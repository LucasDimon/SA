import React from 'react';
import { Link } from 'react-router-dom';

export default function PetCard({ pet }) {
  return (
    <div className="pet-card">
      <img
        src={pet.imagem ? pet.imagem : '/src/assets/placeholder.png'}
        alt={pet.nome}
        className="pet-card__image"
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "8px"
        }}
      />

      <div className="pet-info">
        <h3>
          <Link to={`/animals/${pet.id}`}>{pet.nome}</Link>
        </h3>

        <div className="meta">
          <span>{pet.idade ? `${pet.idade} ano(s)` : "Idade não informada"}</span>
          {pet.sexo && <span>{pet.sexo}</span>}
          {pet.porte && <span>{pet.porte}</span>}
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
