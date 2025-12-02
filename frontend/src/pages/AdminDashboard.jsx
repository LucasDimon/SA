import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminDashboard() {
  const [lista, setLista] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    nome: "",
    especie: "",
    raca: "",
    idade: "",
    sexo: "",
    porte: "",
    descricao: "",
    foto: null
  });

  async function carregar() {
    const res = await api.get("/animals");
    setLista(res.data);
  }

  useEffect(() => {
    carregar();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({...form, [name]: value});
  }

  async function salvar(e) {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach(k => data.append(k, form[k]));

    if (editId) {
      await api.put(`/animals/${editId}`, data);
    } else {
      await api.post("/animals", data);
    }

    setEditId(null);
    setForm({
      nome: "",
      especie: "",
      raca: "",
      idade: "",
      sexo: "",
      porte: "",
      descricao: "",
      foto: null
    });
    carregar();
  }

  function editar(a) {
    setEditId(a.id);
    setForm({
      nome: a.nome,
      especie: a.especie,
      raca: a.raca || "",
      idade: a.idade || "",
      sexo: a.sexo || "",
      porte: a.porte || "",
      descricao: a.descricao || "",
      foto: null
    });
  }

  async function remover(id) {
    if (!confirm("Deseja remover este animal?")) return;
    await api.delete(`/animals/${id}`);
    carregar();
  }

  return (
    <div className="container admin">

      <h2>Painel do Administrador</h2>

      <form onSubmit={salvar} className="admin-form">
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
        <input name="especie" placeholder="Espécie" value={form.especie} onChange={handleChange} required />
        <input name="raca" placeholder="Raça" value={form.raca} onChange={handleChange} />
        <input name="idade" placeholder="Idade" value={form.idade} onChange={handleChange} />
        <input name="sexo" placeholder="Sexo" value={form.sexo} onChange={handleChange} />
        <input name="porte" placeholder="Porte" value={form.porte} onChange={handleChange} />

        <textarea name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange}></textarea>

        <label>Foto:</label>
        <input type="file" name="foto" onChange={(e)=>setForm({...form, foto: e.target.files[0]})} />

        <button type="submit">{editId ? "Atualizar" : "Cadastrar"}</button>
      </form>

      <h3>Animais cadastrados</h3>
      <div>
        {lista.map(a => (
          <div key={a.id} className="admin-item">
            <strong>{a.nome} ({a.especie})</strong>
            <div>
              <button onClick={()=>editar(a)}>Editar</button>
              <button onClick={()=>remover(a.id)}>Remover</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
