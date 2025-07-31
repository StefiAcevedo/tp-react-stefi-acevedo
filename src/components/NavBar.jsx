import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav style={{ padding: '1rem', background: '#eee' }}>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/populares">Populares</Link></li>
        <li><Link to="/buscador">Buscador</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
