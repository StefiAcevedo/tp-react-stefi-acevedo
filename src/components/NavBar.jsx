import React, { useState } from 'react';
import './NavBar.css';

export default function NavBar() {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  // Para accesibilidad: abrir/cerrar menú con Enter o Space
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleMenu();
    }
  };

  return (
    <nav>
      <div className="logo">MiLogo</div>

      <ul className={menuActive ? 'active' : ''}>
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#servicios">Servicios</a></li>
        <li><a href="#ultimos-lanzamientos">Últimos Lanzamientos</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>

      <div
        className="menu-toggle"
        onClick={toggleMenu}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}
