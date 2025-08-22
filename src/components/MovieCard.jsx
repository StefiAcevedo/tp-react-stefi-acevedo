// src/components/MovieCard.jsx
import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { getImageUrl } from "../services/tmdb";
import "./MovieCard.scss";

export default function MovieCard({ movie }) {
  const { isFav, toggle } = useFavorites();
  const poster = getImageUrl(movie?.poster_path, "w342");
  const fav = isFav(movie?.id);

  return (
    <article className="movie-card">
      <div className="movie-card__poster-wrap">
        {/* Botón favorito flotante */}
        <button
          type="button"
          className={`fav-fab ${fav ? "is-active" : ""}`}
          onClick={() => toggle(movie)}
          aria-label={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
          title={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {fav ? "❤️" : "🤍"}
        </button>

        {/* Imagen clickeable al detalle */}
        <Link to={`/detalle/${movie.id}`} aria-label={`Ver detalle de ${movie.title}`}>
          {poster && (
            <img
              className="movie-card__poster"
              src={poster}
              alt={movie.title}
              loading="lazy"
            />
          )}
        </Link>
      </div>

      <h3 className="movie-card__title">{movie.title}</h3>

      <Link className="movie-card__btn" to={`/detalle/${movie.id}`}>
        Ver detalle
      </Link>
    </article>
  );
}
