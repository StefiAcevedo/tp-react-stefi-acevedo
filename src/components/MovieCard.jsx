// src/components/MovieCard.jsx
import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { getImageUrl } from "../services/tmdb";
import "./MovieCard.scss";

export default function MovieCard({ movie }) {
  const { isFav, toggle } = useFavorites();
  const poster = getImageUrl(movie.poster_path, "w342");

  return (
    <article className="movie-card">
      <div className="movie-card__media">
        <Link to={`/detalle/${movie.id}`}>
          {poster && <img src={poster} alt={movie.title} loading="lazy" />}
        </Link>

        <button
          className={`fav-btn ${isFav(movie.id) ? "active" : ""}`}
          onClick={() => toggle(movie)}
          aria-label={isFav(movie.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {isFav(movie.id) ? "❤️" : "🤍"}
        </button>
      </div>

      <h3 className="movie-card__title">{movie.title}</h3>

      <Link className="movie-card__btn" to={`/detalle/${movie.id}`}>
        Ver detalle
      </Link>
    </article>
  );
}
