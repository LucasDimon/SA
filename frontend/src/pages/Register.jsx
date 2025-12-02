import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [data_nascimento, setDataNascimento] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        nome,
        email,
        senha,
        data_nascimento
      });
      alert("Cadastro realizado! Faça login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao cadastrar");
    }
  }

  return (
    <div className="auth container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome completo:</label>
        <input value={nome} onChange={(e)=>setNome(e.target.value)} required />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>

        <label>Data de Nascimento:</label>
        <input type="date" value={data_nascimento} onChange={(e)=>setDataNascimento(e.target.value)} />

        <label>Senha:</label>
        <input type="password" value={senha} onChange={(e)=>setSenha(e.target.value)} required/>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
