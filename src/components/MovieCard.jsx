// src/components/MovieCard.jsx
import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import "./MovieCard.scss";

export default function MovieCard({ movie }) {
  const { isFav, toggle } = useFavorites();

  return (
    <div className="movie-card">
      <Link to={`/detalle/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
      </Link>

      <h3>{movie.title}</h3>

      <div className="movie-card__actions">
        <button
          className={`fav-btn ${isFav(movie.id) ? "active" : ""}`}
          onClick={() => toggle(movie)}
          aria-label={isFav(movie.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {isFav(movie.id) ? "❤️" : "🤍"}
        </button>

        <Link to={`/detalle/${movie.id}`} className="movie-card__btn">
          Ver detalle
        </Link>
      </div>
    </div>
  );
}
