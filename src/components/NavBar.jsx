import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  const linkClass = ({ isActive }) =>
    isActive ? "nav__link nav__link--active" : "nav__link";

  return (
    <nav className="nav">
      <NavLink to="/" end className={linkClass}>Home</NavLink>
      <NavLink to="/buscador" className={linkClass}>Buscador</NavLink>
      <NavLink to="/populares" className={linkClass}>Populares</NavLink>
      <NavLink to="/ultimos-lanzamientos" className={linkClass}>Últimos Lanzamientos</NavLink>
    </nav>
  );
}
