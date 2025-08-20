import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Detalle.scss";

export default function Detalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [personaje, setPersonaje] = useState(null);
  const [episodios, setEpisodios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("[DEBUG] fetching personaje id=", id);
    const fetchPersonaje = async () => {
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        if (!res.ok) throw new Error("No se pudo cargar el detalle");
        const data = await res.json();
        console.log("[DEBUG] personaje data:", data);
        setPersonaje(data);

        // trae hasta 6 episodios
        const urls = (data.episode || []).slice(0, 6);
        const eps = await Promise.all(
          urls.map((u) => fetch(u).then((r) => r.json()))
        );
        setEpisodios(eps);

      } catch (err) {
        console.error("[DEBUG] error:", err);
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

            {episodios.length > 0 && (
              <div className="detalle__episodios">
                <h2>Episodios</h2>
                <ul>
                  {episodios.map((ep) => (
                    <li key={ep.id}>
                      <strong>{ep.episode}</strong> — {ep.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              className="detalle__back"
              onClick={() => navigate(-1)}
            >
              Volver
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
