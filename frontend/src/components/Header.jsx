import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, logout } from '../utils/auth';

export default function Header() {
  const navigate = useNavigate();
  const token = getToken();
  const isLogged = !!token;

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

          {isLogged && (
            <>
              {/* Botão para cadastrar pet */}
              <Link to="/admin/add-pet" className="auth-link">
                Cadastrar Pet
              </Link>
              <button className="link-button" onClick={handleLogout}>
                Sair
              </button>
            </>
          )}

          {!isLogged && (
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
