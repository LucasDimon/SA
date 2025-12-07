import { useState } from "react";
import api from "../api";
import { getToken } from "../utils/auth";

export default function CadastrarPet() {
  const [form, setForm] = useState({
    nome: "",
    especie: "Cachorro",
    idade: 0,
    raca: "",
    porte: "",
    sexo: "",
    descricao: "",
    vacinado: false,
    castrado: false,
    imagem: "" // 👈 NOVO CAMPO
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = getToken();
      await api.post("/pets", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Pet cadastrado com sucesso!");
      window.location.href = "/"; // redireciona após cadastro
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar pet");
    }
  }

  return (
    <div className="container">
      <h2>Cadastrar Pet</h2>
      <form onSubmit={handleSubmit}>
        
        <label>Nome:</label>
        <input type="text" name="nome" value={form.nome} onChange={handleChange} required />

        <label>Espécie:</label>
        <select name="especie" value={form.especie} onChange={handleChange}>
          <option value="Cachorro">Cão</option>
          <option value="Gato">Gato</option>
          <option value="Cavalo">Cavalo</option>
        </select>

        <label>Idade:</label>
        <input type="number" name="idade" value={form.idade} onChange={handleChange} required />

        <label>Raça:</label>
        <input type="text" name="raca" value={form.raca} onChange={handleChange} required />

        <label>Porte:</label>
        <input type="text" name="porte" value={form.porte} onChange={handleChange} />

        <label>Sexo:</label>
        <input type="text" name="sexo" value={form.sexo} onChange={handleChange} />

        <label>Descrição:</label>
        <textarea name="descricao" value={form.descricao} onChange={handleChange}></textarea>

        <label>Imagem (link):</label> {/* 👈 NOVO CAMPO VISUAL */}
        <input
          type="text"
          name="imagem"
          placeholder="https://exemplo.com/imagem.png"
          value={form.imagem}
          onChange={handleChange}
        />

        <label>
          <input type="checkbox" name="vacinado" checked={form.vacinado} onChange={handleChange} />
          Vacinado
        </label>

        <label>
          <input type="checkbox" name="castrado" checked={form.castrado} onChange={handleChange} />
          Castrado
        </label>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
