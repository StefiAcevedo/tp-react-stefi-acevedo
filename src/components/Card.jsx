import { Link } from "react-router-dom";
import "./Card.scss";

function Card({ id, name, image, species, status }) {
  return (
    <article className="card">
      <Link to={`/detalle/${id}`} className="card__link" aria-label={`Ver detalle de ${name}`}>
        <div className="card__media">
          <img className="card__img" src={image} alt={name} loading="lazy" />
        </div>
        <div className="card__body">
          <h3 className="card__title">{name}</h3>
          <p className="card__meta">
            {species} • {status}
          </p>
          <span className="card__cta">Ver detalle</span>
        </div>
      </Link>
    </article>
  );
}

export default Card;
