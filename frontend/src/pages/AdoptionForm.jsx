import React, { useState } from "react";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

export default function AdoptionForm() {
  const { id } = useParams(); // id do animal
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome_completo: "",
    residencia_fixa: false,
    teve_pet_antes: false,
    ja_adotou_antes: false,
    pode_buscar: false,
    telefone_contato: "",
    observacoes: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({...form, [name]: value});
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/adoptions", {
        animal_id: id,
        ...form
      });

      alert("Solicitação enviada! O administrador entrará em contato.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao enviar solicitação");
    }
  }

  return (
    <div className="container">
      <h2>Formulário de Adoção</h2>

      <form onSubmit={handleSubmit} className="adoption-form">
        <label>Nome completo</label>
        <input name="nome_completo" value={form.nome_completo} onChange={handleChange} required />

        <label>Você tem residência fixa?</label>
        <select name="residencia_fixa" value={form.residencia_fixa} onChange={handleChange}>
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>

        <label>Já teve pet antes?</label>
        <select name="teve_pet_antes" value={form.teve_pet_antes} onChange={handleChange}>
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>

        <label>Já adotou antes?</label>
        <select name="ja_adotou_antes" value={form.ja_adotou_antes} onChange={handleChange}>
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>

        <label>Pode buscar o pet no local dele?</label>
        <select name="pode_buscar" value={form.pode_buscar} onChange={handleChange}>
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>

        <label>Telefone para contato:</label>
        <input name="telefone_contato" value={form.telefone_contato} onChange={handleChange} required />

        <label>Observações:</label>
        <textarea name="observacoes" value={form.observacoes} onChange={handleChange} />

        <button type="submit">Enviar Solicitação</button>
      </form>
    </div>
  );
}
