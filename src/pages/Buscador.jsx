// src/pages/Buscador.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { useSearchMovies } from "../hooks/useSearchMovies";
import "./Buscador.scss";

export default function Buscador() {
  // URL: ?q=...&page=...
  const [params, setParams] = useSearchParams();
  const qParam = params.get("q") || "";
  const pageParam = Math.max(1, parseInt(params.get("page") || "1", 10));

  // input controlado
  const [qInput, setQInput] = useState(qParam);

  // datos desde TMDB
  const { data, loading, error } = useSearchMovies(qParam, pageParam);
  const results = data?.results || [];
  const totalPages = data?.total_pages || 1;

  // si cambian params externos, sincronizo el input
  useEffect(() => {
    setQInput(qParam);
  }, [qParam]);

  const onSubmit = (e) => {
    e.preventDefault();
    const q = qInput.trim();
    if (!q) return;
    setParams({ q, page: "1" });
  };

  const goPage = (p) => {
    const q = (qParam || qInput).trim();
    if (!q) return;
    const next = Math.min(Math.max(1, p), totalPages || 1);
    setParams({ q, page: String(next) });
  };

  const emptyState =
    !loading && !error && !qParam ? (
      <p className="home__status">Escribí algo para buscar películas.</p>
    ) : !loading && !error && qParam && results.length === 0 ? (
      <p className="home__status">No se encontraron resultados para “{qParam}”.</p>
    ) : null;

  return (
    <main className="buscador">
      <div className="buscador__wrap">
        <h1 className="page-title">Buscador</h1>

        <form className="searchbar" onSubmit={onSubmit}>
          <input
            className="searchbar__input"
            type="search"
            placeholder="Buscar películas…"
            value={qInput}
            onChange={(e) => setQInput(e.target.value)}
            aria-label="Buscar películas"
          />
          <button className="searchbar__btn" type="submit">
            Buscar
          </button>
        </form>

        {/* Skeletons */}
        {loading && (
          <div className="skeletons">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="skel-card">
                <div className="skel-img" />
                <div className="skel-line" />
                <div className="skel-line" />
              </div>
            ))}
          </div>
        )}

        {/* Errores */}
        {error && !loading && (
          <p className="home__status error">
            Ocurrió un error al buscar. Probá de nuevo.
          </p>
        )}

        {/* Resultados */}
        {!loading && !error && results.length > 0 && (
          <>
            <div className="movies-grid">
              {results.map((m) => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>

            <div className="paginator">
              <button onClick={() => goPage(pageParam - 1)} disabled={pageParam <= 1}>
                ‹ Anterior
              </button>
              <span>
                Página <strong>{pageParam}</strong> de <strong>{totalPages}</strong>
              </span>
              <button onClick={() => goPage(pageParam + 1)} disabled={pageParam >= totalPages}>
                Siguiente ›
              </button>
            </div>
          </>
        )}

        {/* Vacio / hints */}
        {emptyState}
      </div>
    </main>
  );
}
