// src/router/Router.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Populares from "../pages/Populares";
import Buscador from "../pages/Buscador";
import Detalle from "../pages/Detalle";
import UltimosLanzamientos from "../pages/UltimosLanzamientos"; // IMPORT CORRECTO
import TmdbTest from "../pages/TmdbTest"; // ruta de prueba TMDB

import NavBar from "../components/NavBar";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/populares" element={<Populares />} />
        <Route path="/buscador" element={<Buscador />} />
        <Route path="/ultimos-lanzamientos" element={<UltimosLanzamientos />} />
        <Route path="/detalle/:id" element={<Detalle />} />

        {/* Ruta de prueba TMDB */}
        <Route path="/__tmdb" element={<TmdbTest />} />

        {/* Fallback */}
        <Route path="*" element={<div style={{ padding: 16 }}>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}
