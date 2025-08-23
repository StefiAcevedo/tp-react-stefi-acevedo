// src/pages/Detalle.jsx
import { useParams, useNavigate } from "react-router-dom";
import { getImageUrl } from "../services/tmdb";
import { useMovieDetail } from "../hooks/useMovieDetail";
import { useFavorites } from "../hooks/useFavorites";
import "./Detalle.scss";

export default function Detalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Soporta ambas variantes del hook (con `trailer` directo o con `videos`)
  const {
    movie,
    trailer: hookTrailer,
    videos,
    loading,
    error,
  } = useMovieDetail(id);

  const { isFav, toggle } = useFavorites();
  const fav = movie ? isFav(movie.id) : false;

  if (loading) return <section style={{ padding: 16 }}>Cargando…</section>;

  // Error amigable
  if (error) {
    const msg = String(error?.message || error);
    const is404 = msg.includes("404");
    return (
      <section style={{ padding: 16, maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ marginTop: 0 }}>Ups…</h2>
        <p style={{ opacity: 0.85 }}>
          {is404
            ? "No encontramos esa película (puede que el ID no exista)."
            : "Ocurrió un error al cargar la película."}
        </p>
        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: "1rem",
            padding: ".6rem 1rem",
            border: "none",
            borderRadius: 6,
            background: "#6a5acd",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          ← Volver
        </button>
      </section>
    );
  }

  if (!movie) return <section style={{ padding: 16 }}>No se encontró la película.</section>;

  const backdrop = getImageUrl(movie.backdrop_path, "w780");
  const poster = getImageUrl(movie.poster_path, "w342");

  // Trailer: usa el que venga del hook o lo busca en `videos.results`
  const computedTrailer =
    hookTrailer ||
    videos?.results?.find?.((v) => v.type === "Trailer" && v.site === "YouTube");

  const openTrailer = () => {
    if (!computedTrailer?.key) return;
    window.open(`https://www.youtube.com/watch?v=${computedTrailer.key}`, "_blank", "noopener");
  };

  return (
    <section
      style={{
        padding: "1rem",
        maxWidth: 1100,
        margin: "0 auto",
        background: backdrop ? `url(${backdrop}) center/cover no-repeat` : "#f5f5f5",
        borderRadius: 12,
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "1rem",
          padding: ".6rem 1rem",
          border: "none",
          borderRadius: 6,
          background: "#6a5acd",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        ← Volver
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "240px 1fr",
          gap: "1rem",
          background: "rgba(255,255,255,.9)",
          borderRadius: 12,
          padding: "1rem",
        }}
      >
        <div>
          {poster && (
            <img src={poster} alt={movie.title} style={{ width: "100%", borderRadius: 8 }} />
          )}
        </div>

        <div>
          <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
            <h1 style={{ marginTop: 0 }}>{movie.title}</h1>
            {fav && <span className="fav-badge">En favoritos</span>}
          </div>

          <p style={{ opacity: 0.9 }}>{movie.overview || "Sin descripción disponible."}</p>

          <p style={{ marginTop: ".5rem" }}>
            <strong>Estreno:</strong> {movie.release_date || "—"} &nbsp;·&nbsp;
            <strong>Puntaje:</strong> {movie.vote_average?.toFixed?.(1) ?? "—"}
          </p>

          {/* Botón ❤️ toggle */}
          <button
            onClick={() => toggle(movie)}
            style={{
              marginTop: ".75rem",
              padding: ".5rem .9rem",
              border: "1px solid #ccc",
              borderRadius: 8,
              background: "#fff",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {fav ? "❤️ Quitar de favoritos" : "🤍 Agregar a favoritos"}
          </button>

          {/* Botón de tráiler (solo si existe) */}
          {computedTrailer?.key && (
            <button
              onClick={openTrailer}
              style={{
                marginTop: "0.75rem",
                marginLeft: ".5rem",
                padding: ".6rem 1rem",
                border: "none",
                borderRadius: 6,
                background: "#e11d48",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              ▶ Ver tráiler
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
