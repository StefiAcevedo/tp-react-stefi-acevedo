// src/components/NavBar.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import "./NavBar.scss"; // ui! unifica estilos

export default function NavBar() {
  const [open, setOpen] = useState(false);

  // Soporta ambas variantes del hook: {list} o {items}
  const fav = useFavorites();
  const list = fav?.list ?? fav?.items ?? [];
  const count = list.length;

  const linkClass = ({ isActive }) =>
    isActive ? "nav__link active" : "nav__link";

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  return (
    <nav className={`nav ${open ? "is-open" : ""}`}>
      <div className="nav__bar">
        <NavLink to="/" end className="nav__brand" onClick={close}>
          Inicio
        </NavLink>

        <button
          className={`nav__toggle ${open ? "is-open" : ""}`}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={toggle}
        >
          <span className="nav__toggle-line" />
          <span className="nav__toggle-line" />
          <span className="nav__toggle-line" />
        </button>
      </div>

      <div
        id="primary-navigation"
        className={`nav__links ${open ? "is-open" : ""}`}
        onClick={close}
      >
        <NavLink to="/ultimos-lanzamientos" className={linkClass}>
          Últimos Lanzamientos
        </NavLink>
        <NavLink to="/populares" className={linkClass}>
          Populares
        </NavLink>
        <NavLink to="/buscador" className={linkClass}>
          Buscador
        </NavLink>
        <NavLink to="/favoritos" className={linkClass}>
          Favoritos
          {count > 0 && (
            <span className="nav__badge" aria-label={`${count} favoritos`}>
              {count}
            </span>
          )}
        </NavLink>
      </div>
    </nav>
  );
}
