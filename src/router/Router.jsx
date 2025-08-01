import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Populares from '../pages/Populares';
import Buscador from '../pages/Buscador';
import Detalle from '../pages/Detalle';
import NavBar from '../components/NavBar'; // navbar

function AppRouter() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes> {/* Acá debo ir sumando las diferentes rutas: controlar el Mayus*/}
        <Route path="/" element={<Home />} />
        <Route path="/populares" element={<Populares />} />
        <Route path="/buscador" element={<Buscador />} />
        <Route path="/detalle/:id" element={<Detalle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
