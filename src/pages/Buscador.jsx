import { useState } from "react";

export default function Buscador() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(query)}`
      );
      if (!res.ok) throw new Error("Error en la búsqueda");
      const data = await res.json();
      setResults(data.results || []);
      if (!data.results?.length) setError("No se encontraron resultados.");
    } catch (err) {
      setError("No se encontraron resultados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ padding: "1rem" }}>
      <h1>Buscador</h1>

      <form onSubmit={handleSubmit} role="search" style={{ display: "grid", gap: ".75rem", maxWidth: 600 }}>
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

      <div style={{ marginTop: "1rem" }}>
        {loading && <p>Cargando...</p>}
        {error && !loading && <p>{error}</p>}
        {!loading && !error && results.length > 0 && (
          <ul>
            {results.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
