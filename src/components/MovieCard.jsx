// src/components/MovieCard.jsx
import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import "./MovieCard.scss";

export default function MovieCard({ movie }) {
  const { isFav, toggle } = useFavorites();

  return (
    <div className="movie-card">
      {/* Contenedor para la imagen y el botón flotante */}
      <div className="movie-card__thumb">
        <Link to={`/pelicula/${movie.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
          />
        </Link>

        {/* Botón ❤️ flotante */}
        <button
          className={`fav-fab ${isFav(movie.id) ? "active" : ""}`}
          aria-label={isFav(movie.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
          onClick={(e) => {
            e.preventDefault(); // evita navegar cuando se hace click en el corazón
            toggle(movie);
          }}
        >
          {isFav(movie.id) ? "❤️" : "🤍"}
        </button>
      </div>

      <h3>{movie.title}</h3>

      <Link to={`/pelicula/${movie.id}`} className="movie-card__btn">
        Ver detalle
      </Link>
    </div>
  );
}
