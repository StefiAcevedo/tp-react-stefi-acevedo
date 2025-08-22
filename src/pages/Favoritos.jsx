// src/pages/Favoritos.jsx
import { useFavorites } from "../hooks/useFavorites";
import MovieCard from "../components/MovieCard";

export default function Favoritos() {
  const { favorites } = useFavorites();

  return (
    <section style={{ padding: "1rem", maxWidth: 1100, margin: "0 auto" }}>
      <h1>Favoritos</h1>

      {favorites.length === 0 ? (
        <p style={{ opacity: 0.85 }}>
          Aún no tenés favoritos. Tocá el ❤️ en alguna película para guardarla.
        </p>
      ) : (
        <div className="movies-grid">
          {favorites.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      )}
    </section>
  );
}
