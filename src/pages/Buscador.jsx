import { useState } from "react";
import Card from "./Card.jsx";
import "./Buscador.scss";

export default function Buscador() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setHasSearched(true);
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(query)}`
      );
      if (!res.ok) throw new Error("HTTP error");
      const data = await res.json();

      const list = data.results ?? [];
      setResults(list);

      // Importante! el error no aplica si la lista viene vacía
      // (así se muestra el mensaje amigable de “Probá con otro nombre”).
      setError(null);
    } catch {
      // Importante! El error solo es para fallas reales de red/servidor
      setError("Ocurrió un problema al buscar. Probá de nuevo.");
    } finally {
      setLoading(false);
    }
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
        <div className="results">
          {results.map((item) => (
            <Card key={item.id} personaje={item} />
          ))}
        </div>
      )}
    </section>
  );
}
