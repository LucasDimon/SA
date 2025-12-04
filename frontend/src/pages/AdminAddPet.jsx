import React, { useState } from "react";
import api from "../api/api"; // Importação Corrigida: Usando o cliente 'api'

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

    // Adiciona os campos de texto/booleano
    Object.entries(form).forEach(([key, value]) => fd.append(key, value));
    
    // Adiciona a imagem
    if (imagem) fd.append("imagem", imagem);

    try {
      // Chamada Corrigida: Usando 'api.post' e a rota relativa '/pets'
      const res = await api.post("/pets", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Pet cadastrado com sucesso!");
      
      // Opcional: Limpar formulário após sucesso
      setForm({
        nome: "", especie: "", idade: "", sexo: "", porte: "", 
        descricao: "", vacinado: false, castrado: false,
      });
      setImagem(null);
      
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Erro ao cadastrar pet.");
    }
  }

  return (
    <div className="container">
      <h2>Cadastrar Novo Pet</h2>

      <form onSubmit={handleSubmit} className="form">
        
        <input type="text" name="nome" placeholder="Nome" required value={form.nome} onChange={handleChange} />

        <select name="especie" required value={form.especie} onChange={handleChange}>
          <option value="">Selecione a Espécie</option>
          <option>Cão</option>
          <option>Gato</option>
          <option>Cavalo</option>
        </select>

        <input type="text" name="idade" placeholder="Idade" required value={form.idade} onChange={handleChange} />
        <input type="text" name="sexo" placeholder="Sexo" required value={form.sexo} onChange={handleChange} />
        <input type="text" name="porte" placeholder="Porte" required value={form.porte} onChange={handleChange} />

        <textarea name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange}></textarea>

        <label>
          <input type="checkbox" name="vacinado" checked={form.vacinado} onChange={e => setForm({ ...form, vacinado: e.target.checked })} />
          Vacinado
        </label>

        <label>
          <input type="checkbox" name="castrado" checked={form.castrado} onChange={e => setForm({ ...form, castrado: e.target.checked })} />
          Castrado
        </label>

        <label>
          Foto do Pet:
          <input type="file" onChange={(e) => setImagem(e.target.files[0])} />
        </label>

        <button type="submit" className="btn">Cadastrar Pet</button>
      </form>
    </div>
  );
}