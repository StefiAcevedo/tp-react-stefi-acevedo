import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Populares from '../pages/Populares';
import Buscador from '../pages/Buscador';
import Detalle from '../pages/Detalle';
import UltimosLanzamientos from '../pages/UltimosLanzamientos'; // link nuevo!
import NavBar from '../components/NavBar';

function AppRouter() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/populares" element={<Populares />} />
        <Route path="/buscador" element={<Buscador />} />
        <Route path="/detalle/:id" element={<Detalle />} />
        <Route path="/ultimos-lanzamientos" element={<UltimosLanzamientos />} /> 

        {/* Debug y fallback */}
        <Route path="/__ping" element={<div style={{padding:'1rem'}}>PING OK</div>} />
        <Route path="*" element={<div style={{padding:'1rem'}}>404: ruta no matcheada</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
