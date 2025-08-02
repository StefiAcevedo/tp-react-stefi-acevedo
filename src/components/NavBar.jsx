import './NavBar.css';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><NavLink to="/" className="navbar-link" end>Inicio</NavLink></li>
        <li><NavLink to="/populares" className="navbar-link">Populares</NavLink></li>
        <li><NavLink to="/buscador" className="navbar-link">Buscador</NavLink></li>
      </ul>
    </nav>
  );
}

export default NavBar;
