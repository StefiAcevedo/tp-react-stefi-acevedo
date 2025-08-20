import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Detalle.scss";

export default function Detalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [personaje, setPersonaje] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [episodes, setEpisodes] = useState([]); // es nuevo! 

  useEffect(() => {
    const fetchPersonaje = async () => {
      try {
        const res = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        if (!res.ok) throw new Error("No se pudo cargar el detalle");
        const data = await res.json();
        setPersonaje(data);

        // después de traer el personaje, cargamos los episodios
        if (data.episode?.length) {
          // Tomamos sólo los primeros 8 episodios para no cargar de más
          const firstEpisodes = data.episode.slice(0, 8);

          const epResponses = await Promise.all(
            firstEpisodes.map((url) => fetch(url).then((r) => r.json()))
          );

          setEpisodes(epResponses); // es nuevo! set de episodios.mejora!
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

  return (
    <section className="detalle">
      <button className="detalle__volver" onClick={() => navigate(-1)}> 
        ← Volver
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
          </div>
        </div>
      )}

      {episodes.length > 0 && (
        <div className="detalle__episodios">
          <h2>Episodios</h2>
          <ul>
            {episodes.map((ep) => (
              <li key={ep.id}>
                <strong>{ep.episode}</strong> — {ep.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
