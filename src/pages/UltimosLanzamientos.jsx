import React from "react";
import './UltimosLanzamientos.scss';

const peliculas = [
  {
    id: 1,
    titulo: "Inside Out 2",
    imagen: "https://image.tmdb.org/t/p/w500/2C3CdVzINUm5Cm1lrbT2uiRstwX.jpg",
    fecha: "2024-07-01"
  },
  {
    id: 2,
    titulo: "Deadpool & Wolverine",
    imagen: "https://image.tmdb.org/t/p/w500/yF1eOkaYvwiORauRCPWznV9xVvi.jpg",
    fecha: "2024-07-25"
  },
  {
    id: 3,
    titulo: "The Garfield Movie",
    imagen: "https://image.tmdb.org/t/p/w500/bkpPTZUdq31UGDovmszsg2CchiI.jpg",
    fecha: "2024-06-05"
  }
];

const UltimosLanzamientos = () => {
  return (
    <div className="ultimos-lanzamientos">
      <h1 className="titulo">Últimos lanzamientos</h1>
      <div className="contenedor-cards">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="card">
            <img src={pelicula.imagen} alt={pelicula.titulo} />
            <h2>{pelicula.titulo}</h2>
            <p>Estreno: {pelicula.fecha}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UltimosLanzamientos;
