import { useFavorites } from "../hooks/useFavorites";
import MovieCard from "../components/MovieCard";

export default function Favoritos() {
  const { list } = useFavorites();

  return (
    <main className="container" style={{ padding: "1rem 1rem 2rem" }}>
      <h1>Favoritos</h1>

      {list.length === 0 ? (
        <p style={{ opacity: 0.85 }}>
          Aún no agregaste películas a favoritos. Agregá desde cualquier card con el ❤️.
        </p>
      ) : (
        <div className="movies-grid">
          {list.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      )}
    </main>
  );
}
