import { useEffect, useState } from "react";
import { tmdbGet } from "../services/tmdb";

export default function TmdbTest() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    tmdbGet("/movie/popular") // uso tmdbGet (no fetchFromTMDB) no olvidar
      .then((data) => setMovies(data?.results ?? []))
      .catch((err) => console.error("[TMDB]", err));
  }, []);

  return (
    <section style={{ padding: 16 }}>
      <h1>Prueba TMDB</h1>
      {movies.length === 0 ? (
        <p>Cargando…</p>
      ) : (
        <ul>
          {movies.slice(0, 8).map((m) => (
            <li key={m.id}>{m.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
