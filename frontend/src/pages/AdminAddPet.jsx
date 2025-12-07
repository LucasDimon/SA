import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { getToken } from "../utils/auth";

export default function AdminAddPet() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    especie: "Cão",
    idade: "",
    sexo: "",
    porte: "",
    descricao: "",
    vacinado: false,
    castrado: false,
    imagem: ""
  });

  const [previewUrl, setPreviewUrl] = useState("");

  // 🔒 Garantir que só logado acesse (além do ProtectedRoute)
  useEffect(() => {
    const token = getToken();
    if (!token) {
      alert("Você precisa estar logado para cadastrar um pet.");
      navigate("/login");
    }
  }, [navigate]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    if (name === "imagem") {
      setPreviewUrl(value);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/pets", {
        ...form,
        idade: form.idade ? Number(form.idade) : null,
      });

      alert("Pet cadastrado com sucesso!");
      // limpa formulário
      setForm({
        nome: "",
        especie: "Cão",
        idade: "",
        sexo: "",
        porte: "",
        descricao: "",
        vacinado: false,
        castrado: false,
        imagem: ""
      });
      setPreviewUrl("");

      // volta pra listagem
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Erro ao cadastrar pet.");
    }
  }

  return (
    <div className="container page-cadastrar-pet">
      <h2>Cadastrar Novo Pet</h2>
      <p>Preencha os dados abaixo para cadastrar um novo amigo para adoção 🐾</p>

      <div className="form-layout">
        <form onSubmit={handleSubmit} className="form-card">
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Espécie</label>
            <select
              name="especie"
              value={form.especie}
              onChange={handleChange}
            >
              <option value="Cão">Cão</option>
              <option value="Gato">Gato</option>
              <option value="Cavalo">Cavalo</option>
            </select>
          </div>

          <div className="form-group">
            <label>Idade (em anos)</label>
            <input
              type="number"
              min="0"
              name="idade"
              value={form.idade}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Sexo</label>
            <input
              type="text"
              name="sexo"
              placeholder="Macho / Fêmea"
              value={form.sexo}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Porte</label>
            <input
              type="text"
              name="porte"
              placeholder="Pequeno / Médio / Grande"
              value={form.porte}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea
              name="descricao"
              rows={3}
              value={form.descricao}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Imagem (URL)</label>
            <input
              type="text"
              name="imagem"
              placeholder="https://exemplo.com/meu-pet.jpg"
              value={form.imagem}
              onChange={handleChange}
            />
            <small>Use um link completo começando com http:// ou https://</small>
          </div>

          <div className="form-group check-group">
            <label>
              <input
                type="checkbox"
                name="vacinado"
                checked={form.vacinado}
                onChange={handleChange}
              />
              Vacinado
            </label>

            <label>
              <input
                type="checkbox"
                name="castrado"
                checked={form.castrado}
                onChange={handleChange}
              />
              Castrado
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            Cadastrar Pet
          </button>
        </form>

        {/* Prévia da imagem + resumo */}
        <div className="preview-card">
          <h3>Prévia</h3>

          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Prévia do pet"
              className="preview-img"
              onError={(e) => {
                e.target.src = '/src/assets/placeholder.png';
              }}
            />
          ) : (
            <p>Nenhuma imagem informada ainda.</p>
          )}

          <div className="preview-info">
            <p><strong>Nome:</strong> {form.nome || '—'}</p>
            <p><strong>Espécie:</strong> {form.especie}</p>
            <p><strong>Idade:</strong> {form.idade || '—'}</p>
            <p><strong>Sexo:</strong> {form.sexo || '—'}</p>
            <p><strong>Porte:</strong> {form.porte || '—'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
