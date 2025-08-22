// src/pages/Buscador.jsx
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovies } from "../hooks/useSearchMovies";
import MovieCard from "../components/MovieCard";
import "./Buscador.scss"; 

export default function Buscador() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const pageFromUrl = parseInt(params.get("page") ?? "1", 10);
  const page = Number.isNaN(pageFromUrl) || pageFromUrl < 1 ? 1 : pageFromUrl;

  const { data, loading, error } = useSearchMovies(q, page);
  const results = data.results || [];
  const totalPages = data.total_pages || 0;

  const hasSearched = useMemo(() => q.trim().length > 0, [q]);

  const onSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const nextQ = (form.get("q") ?? "").toString();
    setParams((prev) => {
      const p = new URLSearchParams(prev);
      if (nextQ.trim()) {
        p.set("q", nextQ.trim());
        p.set("page", "1"); // reset de página
      } else {
        p.delete("q");
        p.delete("page");
      }
      return p;
    }, { replace: false });
  };

  const goPage = (next) => {
    setParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("page", String(next));
      return p;
    });
  };

  // si la página de la URL excede el total, volvemos a 1
  useEffect(() => {
    if (!loading && totalPages > 0 && page > totalPages) {
      goPage(1);
    }
  }, [loading, totalPages, page]);

  return (
    <section className="buscador" style={{ padding: "1rem", maxWidth: 1100, margin: "0 auto" }}>
      <h1>Buscador</h1>

      <form role="search" onSubmit={onSubmit} style={{ display: "grid", gap: "1rem", marginBottom: "1rem" }}>
        <label htmlFor="q">¿Qué querés buscar?</label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={q}
          placeholder="Ej: Matrix, Barbie…"
          autoComplete="off"
        />
        <button type="submit">Buscar</button>
      </form>

      {/* Skeletons */}
      {loading && (
        <div className="skeletons">
          {Array.from({ length: 12 }).map((_, i) => (
            <div className="skel-card" key={i}>
              <div className="skel-img" />
              <div className="skel-line" />
              <div className="skel-line" style={{ width: "70%" }} />
            </div>
          ))}
        </div>
      )}

      {/* Errores */}
      {error && !loading && (
        <p style={{ color: "#c00" }}>Ocurrió un error al buscar. Probá de nuevo.</p>
      )}

      {/* Sin resultados (solo si ya buscó) */}
      {!loading && !error && hasSearched && results.length === 0 && (
        <p style={{ opacity: 0.9 }}>No encontramos “{q}”. Probá con otro título 🙂</p>
      )}

      {/* Resultados */}
      {!loading && !error && results.length > 0 && (
        <>
          <div className="results">
            {results.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>

          {/* Paginado */}
          <div style={{ display: "flex", gap: ".75rem", justifyContent: "center", marginTop: "1rem" }}>
            <button onClick={() => goPage(Math.max(1, page - 1))} disabled={page <= 1}>
              ‹ Anterior
            </button>
            <span>Página <strong>{page}</strong> de <strong>{totalPages}</strong></span>
            <button onClick={() => goPage(Math.min(totalPages, page + 1))} disabled={page >= totalPages}>
              Siguiente ›
            </button>
          </div>
        </>
      )}
    </section>
  );
}
