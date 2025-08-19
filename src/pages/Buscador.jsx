import { useState } from "react";
import "./Buscador.scss";

function Buscador() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return; // Evitamos búsquedas vacías

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${query}`
      );

      if (!res.ok) throw new Error("Error en la búsqueda");

      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      setError("No se encontraron resultados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="buscador">
      <div className="buscador__wrap">
        <h1 className="buscador__title">Buscador</h1>

        <form className="buscador__form" onSubmit={handleSubmit} role="search">
          <label className="buscador__label" htmlFor="q">
            ¿Qué querés buscar?
          </label>

          <input
            id="q"
            name="q"
            type="search"
            className="buscador__input"
            placeholder="Ej: Rick, Morty, Summer…"
            value={query}
            onChange={handleChange}
            autoComplete="off"
            aria-label="Buscar personajes"
          />

          <button className="buscador__btn" type="submit">
            Buscar
          </button>
        </form>

        <div className="buscador__results">
          {loading && <p>Cargando...</p>}
          {error && <p>{error}</p>}
          {!loading && results.length > 0 && (
            <ul>
              {results.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default Buscador;
