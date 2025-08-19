import { NavLink } from "react-router-dom";
import "./NavBar.css"; // chequear luego los estilos

export default function NavBar() {
  return (
    <nav className="nav">
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/buscador">Buscador</NavLink>
      <NavLink to="/populares">Populares</NavLink>
      <NavLink to="/ultimos-lanzamientos">Últimos Lanzamientos</NavLink>
    </nav>
  );
}
