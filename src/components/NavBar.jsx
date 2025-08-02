import React, { useState } from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">Mi App</div>

        <button
          className={`navbar-toggle ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <ul className={`navbar-list ${menuOpen ? 'active' : ''}`}>
          <li>
            <NavLink to="/" className="navbar-link" end onClick={closeMenu}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/populares" className="navbar-link" onClick={closeMenu}>
              Populares
            </NavLink>
          </li>
          <li>
            <NavLink to="/buscador" className="navbar-link" onClick={closeMenu}>
              Buscador
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
