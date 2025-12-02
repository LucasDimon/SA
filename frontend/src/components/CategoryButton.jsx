import React from 'react';
export default function CategoryButton({ label, count, color, onClick, active }) {
  return (
    <button className={`category-button ${active ? 'active' : ''}`} onClick={() => onClick(label)} aria-pressed={active}>
      <div className="cat-inner" style={{ background: color }}>
        <div className="cat-icon">🐾</div>
        <div className="cat-title">{label}</div>
        <div className="cat-count">{count} disponíveis</div>
      </div>
    </button>
  );
}
