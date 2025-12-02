import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";

export default function AnimalDetail() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/animals/${id}`);
        setPet(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [id]);

  if (!pet) return <div className="container">Carregando...</div>;

  return (
    <div className="container pet-detail">
      <div className="detail-card">
        <img
          src={pet.foto ? `${import.meta.env.VITE_API_URL}${pet.foto}` : "/src/assets/placeholder.png"}
          alt={pet.nome}
        />

        <div className="detail-body">
          <h2>{pet.nome}</h2>

          <p><strong>Espécie:</strong> {pet.especie}</p>
          <p><strong>Raça:</strong> {pet.raca || "-"}</p>
          <p><strong>Porte:</strong> {pet.porte || "-"}</p>
          <p><strong>Sexo:</strong> {pet.sexo || "-"}</p>
          <p><strong>Idade:</strong> {pet.idade || "-"}</p>

          <p style={{ marginTop: "10px" }}>{pet.descricao}</p>

          <Link to={`/adotar/${pet.id}`} className="btn" style={{ marginTop: "20px", display: "inline-block" }}>
            Quero Adotar ❤️
          </Link>
        </div>
      </div>
    </div>
  );
}
