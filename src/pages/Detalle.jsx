import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Detalle.scss";

function Detalle() {
  const { id } = useParams(); // capturamos el ID de la URL
  const [personaje, setPersonaje] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersonaje = async () => {
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        if (!res.ok) throw new Error("No se pudo cargar el detalle");
        const data = await res.json();
        setPersonaje(data);
      } catch (err) {
        setError("Error cargando el personaje.");
      } finally {
        setLoading(false);
      }
    };

    fetchPersonaje();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

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
          </div>
        </div>
      )}
    </section>
  );
}

export default Detalle;
