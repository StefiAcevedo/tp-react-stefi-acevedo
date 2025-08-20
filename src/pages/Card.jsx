import { useNavigate } from "react-router-dom";
import "../components/Card.scss";

export default function Card({ personaje }) {
  const navigate = useNavigate();
  const go = () => navigate(`/detalle/${personaje.id}`);

  return (
    <article
      className="card"
      onClick={go}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalle de ${personaje.name}`}
      onKeyDown={(e) => e.key === "Enter" && go()}
    >
      <img src={personaje.image} alt={personaje.name} loading="lazy" />
      <h3>{personaje.name}</h3>
    </article>
  );
}
