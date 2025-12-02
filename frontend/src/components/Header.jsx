import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, logout } from '../utils/auth';

export default function Header() {
  const navigate = useNavigate();
  const token = getToken();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Espaço à esquerda (vazio para balancear) */}
        <div className="header-left" aria-hidden="true" />

        {/* Logo centralizado */}
        <div className="header-center">
          <Link to="/" className="logo">PetAdote</Link>
        </div>

        {/* Menu à direita */}
        <nav className="header-right" role="navigation" aria-label="Principal">
          <Link to="/">Início</Link>
          <Link to="/">Sobre</Link>
          <Link to="/">Contato</Link>

          {token ? (
            <button className="link-button" onClick={handleLogout}>Sair</button>
          ) : (
            <>
              <Link to="/login" className="auth-link">Login</Link>
              <Link to="/register" className="auth-link">Cadastro</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
