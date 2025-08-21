// src/components/MovieCard.jsx
import { Link } from "react-router-dom";
import "./MovieCard.scss";
import { getImageUrl } from "../services/tmdb";

export default function MovieCard({ movie }) {
  const poster = getImageUrl(movie.poster_path, "w342");

  return (
    <article className="movie-card">
      {poster && <img src={poster} alt={movie.title} loading="lazy" />}
      <h3>{movie.title}</h3>
      <Link className="movie-card__btn" to={`/detalle/${movie.id}`}>
        Ver detalle
      </Link>
    </article>
  );
}