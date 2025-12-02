import React, { useState } from "react";
import api from "../api/api";
import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, senha });
      setToken(res.data.token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao fazer login");
    }
  }

  return (
    <div className="auth container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>

        <label>Senha:</label>
        <input type="password" value={senha} onChange={(e)=>setSenha(e.target.value)} required/>

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
