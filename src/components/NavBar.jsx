// src/components/NavBar.jsx
import { NavLink } from "react-router-dom";
import "./NavBar.scss";

export default function NavBar() {
  return (
    <nav className="nav">
      <NavLink to="/" end>Inicio</NavLink>
      <NavLink to="/ultimos-lanzamientos">Últimos lanzamientos</NavLink>
      <NavLink to="/populares">Populares</NavLink>
      <NavLink to="/buscador">Buscador</NavLink>
    </nav>
  );
}