import React, { useState } from "react";
import axios from "axios";

export default function AdminAddPet() {
  const [form, setForm] = useState({
    nome: "",
    especie: "",
    idade: "",
    sexo: "",
    porte: "",
    descricao: "",
    vacinado: false,
    castrado: false,
  });

  const [imagem, setImagem] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData();

    Object.entries(form).forEach(([key, value]) => fd.append(key, value));
    if (imagem) fd.append("imagem", imagem);

    const res = await axios.post("http://localhost:3000/pets", fd, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    alert("Pet cadastrado com sucesso!");
  }

  return (
    <div className="container">
      <h2>Cadastrar Novo Pet</h2>

      <form onSubmit={handleSubmit} className="form">
        
        <input type="text" name="nome" placeholder="Nome" required onChange={handleChange} />

        <select name="especie" required onChange={handleChange}>
          <option value="">Selecione</option>
          <option>Cão</option>
          <option>Gato</option>
          <option>Cavalo</option>
        </select>

        <input type="text" name="idade" placeholder="Idade" required onChange={handleChange} />
        <input type="text" name="sexo" placeholder="Sexo" required onChange={handleChange} />
        <input type="text" name="porte" placeholder="Porte" required onChange={handleChange} />

        <textarea name="descricao" placeholder="Descrição" onChange={handleChange}></textarea>

        <label>
          <input type="checkbox" name="vacinado" onChange={e => setForm({ ...form, vacinado: e.target.checked })} />
          Vacinado
        </label>

        <label>
          <input type="checkbox" name="castrado" onChange={e => setForm({ ...form, castrado: e.target.checked })} />
          Castrado
        </label>

        <input type="file" onChange={(e) => setImagem(e.target.files[0])} />

        <button type="submit" className="btn">Cadastrar Pet</button>
      </form>
    </div>
  );
}
