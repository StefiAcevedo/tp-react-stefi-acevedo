import { useFavorites } from "../hooks/useFavorites";
import MovieCard from "../components/MovieCard";

export default function Favoritos() {
  // Soporta {list} o {items}
  const fav = useFavorites();
  const list = fav?.list ?? fav?.items ?? [];

  return (
    <section style={{ padding: "1rem", maxWidth: 1100, margin: "0 auto" }}>
      <h1>Favoritos</h1>

      {list.length === 0 && (
        <p style={{ opacity: 0.8 }}>
          Aún no agregaste películas a favoritos. Agregá desde cualquier card con el ❤️.
        </p>
      )}

      {list.length > 0 && (
        <div className="movies-grid">
          {list.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      )}
    </section>
  );
}
