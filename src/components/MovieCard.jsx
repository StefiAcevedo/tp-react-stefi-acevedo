import { useNavigate } from "react-router-dom";
import "./MovieCard.scss";
import { getImageUrl } from "../services/tmdb";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const poster = getImageUrl(movie.poster_path, "w342");

  return (
    <article className="movie-card">
      {poster && <img src={poster} alt={movie.title} loading="lazy" />}
      <h3>{movie.title}</h3>
      <button className="movie-card__btn" onClick={() => navigate(`/detalle/${movie.id}`)}>
        Ver detalle
      </button>
    </article>
  );
}
