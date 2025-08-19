import { useState } from "react";
import Card from "./Card.jsx";
import "./Buscador.scss";

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

      <div className="resultados">
        {loading && <p>Cargando...</p>}
        {error && !loading && <p>{error}</p>}
        {!loading && !error && results.length > 0 &&
          results.map((item) => <Card key={item.id} personaje={item} />)
        }
      </div>
    </section>
  );
}
