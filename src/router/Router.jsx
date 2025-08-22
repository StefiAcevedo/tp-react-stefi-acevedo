// src/router/Router.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import UltimosLanzamientos from "../pages/UltimosLanzamientos";
import Populares from "../pages/Populares";
import Buscador from "../pages/Buscador";
import Detalle from "../pages/Detalle";
import NavBar from "../components/NavBar";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ultimos-lanzamientos" element={<UltimosLanzamientos />} />
        <Route path="/populares" element={<Populares />} />
        <Route path="/buscador" element={<Buscador />} />
        <Route path="/detalle/:id" element={<Detalle />} />

        {/* Ping de prueba */}
        <Route path="/__ping" element={<div style={{ padding: 16 }}>PING OK</div>} />

        {/* Fallback */}
        <Route path="*" element={<div style={{ padding: 16 }}>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}
