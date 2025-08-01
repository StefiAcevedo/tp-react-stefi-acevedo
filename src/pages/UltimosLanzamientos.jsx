import React from "react";
import './UltimosLanzamientos.scss'; // traigo los estilos del scss

const UltimosLanzamientos = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Últimos lanzamientos</h1>
      {/* Acá van las cards de películas con paginado ver estilos en general! */}
      <p className="text-gray-600">Próximamente verás acá las últimas películas estrenadas.</p>
    </div>
  );
};

export default UltimosLanzamientos;
