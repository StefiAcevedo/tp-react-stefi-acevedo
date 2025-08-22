// src/pages/Home.jsx
import { useRef } from "react";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";
import "./Home.scss";

// Carrusel reutilizable (flechas, sin scrollbar visible)
function CarouselRow({ title, items }) {
  const trackRef = useRef(null);

  const scrollBy = (px) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: px, behavior: "smooth" });
  };

  // mostramos EXACTAMENTE 5 en Home
  const visible = items.slice(0, 10);

  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>

      <div className="carousel">
        <button
          className="carousel__btn carousel__btn--left"
          aria-label="Anterior"
          onClick={() => scrollBy(-600)}
        >
          ‹
        </button>

        <div ref={trackRef} className="carousel__track">
          {visible.map((m) => (
            <div key={m.id} className="carousel__item">
              <MovieCard movie={m} />
            </div>
          ))}
        </div>

        <button
          className="carousel__btn carousel__btn--right"
          aria-label="Siguiente"
          onClick={() => scrollBy(600)}
        >
          ›
        </button>
      </div>
    </section>
  );
}

export default function Home() {
  // Traemos 1 página de cada lista (suficiente para recortar a 5)
  const { data: nowData, loading: nowLoading, error: nowError } = useMovies("now_playing", 1);
  const { data: popData, loading: popLoading, error: popError } = useMovies("popular", 1);
  const { data: topData, loading: topLoading, error: topError } = useMovies("top_rated", 1);

  const now = nowData?.results ?? [];
  const popular = popData?.results ?? [];
  const top = (topData?.results ?? []).slice(0, 10); // EXACTAMENTE 5 en la grilla

  const anyLoading = nowLoading || popLoading || topLoading;
  const anyError = nowError || popError || topError;

  return (
    <main className="home container">
      {/* Estados visibles (evita “pantalla en blanco”) */}
      {anyLoading && <p className="home__status">Cargando datos de películas…</p>}
      {anyError && (
        <p className="home__status error">Ocurrió un error al cargar Home. Revisá la consola.</p>
      )}

      {!anyLoading && !anyError && now.length === 0 && popular.length === 0 && top.length === 0 && (
        <p className="home__status">No hay películas para mostrar en este momento.</p>
      )}

      {/* Recomendadas (carrusel, recortado a 5) */}
      {!anyLoading && now.length > 0 && <CarouselRow title="Recomendadas" items={now} />}

      {/* Populares (carrusel, recortado a 5) */}
      {!anyLoading && popular.length > 0 && <CarouselRow title="Populares" items={popular} />}

      {/* Mejor puntuadas (grilla, recortado a 5) */}
      {!anyLoading && top.length > 0 && (
        <section className="section">
          <h2 className="section-title">Mejor puntuadas</h2>
          <div className="movies-grid">
            {top.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
