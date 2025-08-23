import { useFavorites } from "../hooks/useFavorites";
import MovieCard from "../components/MovieCard";

export default function Favoritos() {
  const fav = useFavorites();
  const list = fav?.list ?? fav?.items ?? [];

  return (
    <section className="section">
      <h1 className="section-title">Favoritos</h1>

      {list.length === 0 ? (
        <p>Aún no agregaste películas a favoritos. Agregá desde cualquier card con el ❤️.</p>
      ) : (
        <div className="movies-grid">
          {list.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      )}
    </section>
  );
}
