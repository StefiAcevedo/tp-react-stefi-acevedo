import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Detalle.scss";

export default function Detalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [personaje, setPersonaje] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersonaje = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        if (!res.ok) throw new Error("No se pudo cargar el detalle");
        const data = await res.json();
        setPersonaje(data);

        // Cargar episodios (todos) y luego mostramos 8 o todos según showAll
        if (data.episode?.length) {
          const epResponses = await Promise.all(
            data.episode.map((url) => fetch(url).then((r) => r.json()))
          );
          setEpisodes(epResponses);
        } else {
          setEpisodes([]);
        }
      } catch (err) {
        setError("Error cargando el personaje.");
      } finally {
        setLoading(false);
      }
    };

    fetchPersonaje();
  }, [id]);

  if (loading) return <p style={{ padding: "1rem" }}>Cargando...</p>;
  if (error) return <p style={{ padding: "1rem" }}>{error}</p>;

  const hasEpisodes = episodes.length > 0; /*esto es nuevo, sobre episodios */
  const canToggle = episodes.length > 8;
  const listToShow = showAll ? episodes : episodes.slice(0, 8);

  return (
    <section className="detalle">
      {/* Botón Volver (coincide con estilos previos `.detalle__back`) */}
      <button className="detalle__back" onClick={() => navigate(-1)}>
        Volver
      </button>

      {personaje && (
        <div className="detalle__wrap">
          <div className="detalle__media">
            <img src={personaje.image} alt={personaje.name} />
          </div>

          <div className="detalle__info">
            <h1>{personaje.name}</h1>
            <p><strong>Especie:</strong> {personaje.species}</p>
            <p><strong>Estado:</strong> {personaje.status}</p>
            <p><strong>Género:</strong> {personaje.gender}</p>
            <p><strong>Origen:</strong> {personaje.origin?.name}</p>
            <p><strong>Ubicación:</strong> {personaje.location?.name}</p>

            {hasEpisodes && (
              <div className="detalle__episodios">
                <h2>Episodios</h2>

                <ul>
                  {listToShow.map((ep) => (
                    <li key={ep.id}>
                      <strong>{ep.episode}</strong> — {ep.name}
                    </li>
                  ))}
                </ul>

                {canToggle && (
                  <button
                    className="detalle__episodios-toggle"
                    onClick={() => setShowAll((v) => !v)}
                  >
                    {showAll ? "Ver menos" : "Ver todos"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
