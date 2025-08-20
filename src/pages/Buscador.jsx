import { useState } from "react";
import Card from "./Card.jsx";
import "./Buscador.scss";

export default function Buscador() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // estados para paginado
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const doSearch = async (q, pageToFetch = 1) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(
          q
        )}&page=${pageToFetch}`
      );

      // La API devuelve 404 cuando no hay más páginas o no hay resultados
      if (!res.ok) {
        // Si no hay resultados: vaciamos y no marcamos "error"
        if (res.status === 404) {
          setResults([]);
          setTotalPages(0);
          setPage(1);
          setError(null);
          return;
        }
        throw new Error("HTTP error");
      }

      const data = await res.json();
      const list = data.results ?? [];
      const pagesFromApi = data.info?.pages ?? 0;

      setResults(list);
      setTotalPages(pagesFromApi);
      setPage(pageToFetch);
      setError(null);
    } catch {
      setError("Ocurrió un problema al buscar. Probá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => { // bloque de paginado, es nuevo
    e.preventDefault();
    if (!query.trim()) return;
    setHasSearched(true);
    await doSearch(query.trim(), 1); // siempre empezamos en página 1
  };

  const goPrev = () => {
    if (page > 1) doSearch(query.trim(), page - 1);
  };

  const goNext = () => {
    if (page < totalPages) doSearch(query.trim(), page + 1);
  };

  return (
    <section className="buscador">
      <h1>Buscador</h1>

      <form onSubmit={handleSubmit} role="search">
        <label htmlFor="q">¿Qué querés buscar?</label>
        <input
          id="q"
          type="search"
          placeholder="Ej: Rick, Morty, Summer…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && (
        <div className="skeletons">
          {[...Array(8)].map((_, i) => (
            <div className="skel-card" key={i}>
              <div className="skel-img" />
              <div className="skel-line" />
              <div className="skel-line" style={{ width: "70%" }} />
            </div>
          ))}
        </div>
      )}

      {error && hasSearched && !loading && (
        <p style={{ opacity: 0.85 }}>{error}</p>
      )}

      {!loading && !error && hasSearched && results.length === 0 && (
        <p style={{ opacity: 0.85 }}>
          No encontramos “{query}”. Probá con otro nombre 🙂
        </p>
      )}

      {!loading && !error && results.length > 0 && (
        <>
          <div className="results">
            {results.map((item) => (
              <Card key={item.id} personaje={item} />
            ))}
          </div>

          {/* Controles de paginado */}
          <div className="pager">
            <button
              className="pager__btn"
              onClick={goPrev}
              disabled={page <= 1}
              aria-label="Página anterior"
            >
              ‹ Anterior
            </button>

            <span className="pager__info">
              Página <strong>{page}</strong> de <strong>{totalPages}</strong>
            </span>

            <button
              className="pager__btn"
              onClick={goNext}
              disabled={page >= totalPages}
              aria-label="Página siguiente"
            >
              Siguiente ›
            </button>
          </div>
        </>
      )}
    </section>
  );
}

