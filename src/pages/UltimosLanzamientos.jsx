import { useState } from "react";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";

export default function UltimosLanzamientos() {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useMovies("now_playing", page);

  const results = data?.results ?? [];
  const totalPages = data?.total_pages ?? 1;

  return (
    <main className="container" style={{ padding: "1rem 1rem 2rem" }}>
      <h1>Últimos lanzamientos</h1>

      {loading && <p>Cargando…</p>}
      {error && !loading && <p>Error: {String(error)}</p>}

      {!loading && !error && results.length > 0 && (
        <>
          <div className="movies-grid">
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
    </main>
  );
}

