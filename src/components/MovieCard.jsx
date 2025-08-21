// src/components/MovieCard.jsx
import { Link } from "react-router-dom";
import "./MovieCard.scss";

export default function MovieCard({ movie }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : "https://via.placeholder.com/342x513?text=Sin+Imagen";

  return (
    <div className="movie-card">
      <img src={imageUrl} alt={movie.title} className="movie-card__image" />
      <h3 className="movie-card__title">{movie.title}</h3>
      <p className="movie-card__date">{movie.release_date}</p>
      <Link to={`/detalle/${movie.id}`} className="movie-card__link">
        Ver detalle
      </Link>
    </div>
  );
}
