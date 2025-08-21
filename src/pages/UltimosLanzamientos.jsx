import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const API = "https://api.themoviedb.org/3";

export default function UltimosLanzamientos() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ results: [], total_pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const key = import.meta.env.VITE_TMDB_API_KEY;
    if (!key) {
      setError("Falta VITE_TMDB_API_KEY en tu .env");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`${API}/movie/now_playing?api_key=${key}&language=es-ES&page=${page}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        setData({
          results: json.results || [],
          total_pages: json.total_pages || 1,
        });
      })
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false));
  }, [page]);

  const results = data.results;
  const totalPages = data.total_pages;

  return (
    <section style={{ padding: "1rem", maxWidth: 1100, margin: "0 auto" }}>
      <h1>Últimos lanzamientos</h1>

      {loading && <p>Cargando…</p>}
      {error && !loading && <p>Error: {error}</p>}

      {!loading && !error && results.length > 0 && (
        <>
          <div
            style={{
              display: "grid",
              gap: "1rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              alignItems: "start",
            }}
          >
            {results.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: ".75rem",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>
              ‹ Anterior
            </button>
            <span>
              Página <strong>{page}</strong> de <strong>{totalPages}</strong>
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              Siguiente ›
            </button>
          </div>
        </>
      )}

      {!loading && !error && results.length === 0 && <p>No hay resultados.</p>}
    </section>
  );
}
