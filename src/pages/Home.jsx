// src/pages/Home.jsx
import { useRef } from "react";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";
import "./Home.scss";

// Carrusel reutilizable (flechas, sin scrollbar visible)
function CarouselRow({ title, items }) {
  const scrollerRef = useRef(null);

  const scrollByPx = (px) => {
    scrollerRef.current?.scrollBy({ left: px, behavior: "smooth" });
  };

  // Mostramos hasta 10 elementos en los carruseles
  const list = (items || []).slice(0, 10);
  if (!list.length) return null;

  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>

      <div className="carousel">
        <button
          type="button"
          aria-label="Anterior"
          className="carousel__btn carousel__btn--left"
          onClick={() => scrollByPx(-600)}
        >
          ‹
        </button>

        <div ref={scrollerRef} className="carousel__track">
          {list.map((m) => (
            <div key={m.id} className="carousel__item">
              <MovieCard movie={m} />
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Siguiente"
          className="carousel__btn carousel__btn--right"
          onClick={() => scrollByPx(600)}
        >
          ›
        </button>
      </div>
    </section>
  );
}

export default function Home() {
  // 1 página por cada lista (suficiente para recortar a 10)
  const { data: nowData, loading: nowLoading, error: nowError } = useMovies("now_playing", 1);
  const { data: popData, loading: popLoading, error: popError } = useMovies("popular", 1);
  const { data: topData, loading: topLoading, error: topError } = useMovies("top_rated", 1);

  const now = nowData?.results ?? [];
  const popular = popData?.results ?? [];
  const top = topData?.results ?? [];

  const anyLoading = nowLoading || popLoading || topLoading;
  const anyError   = nowError   || popError   || topError;

  return (
    <main className="home container">
      {/* Estados visibles para evitar “pantalla en blanco” */}
      {anyLoading && <p className="home__status">Cargando datos de películas…</p>}
      {anyError && (
        <p className="home__status error">
          Ocurrió un error al cargar Home. Revisá la consola para más detalles.
        </p>
      )}

      {/* Mensaje si no hay nada que mostrar */}
      {!anyLoading && !anyError && now.length === 0 && popular.length === 0 && top.length === 0 && (
        <p className="home__status">No hay películas para mostrar en este momento.</p>
      )}

      {/* Recomendadas (carrusel) */}
      {!anyLoading && now.length > 0 && <CarouselRow title="Recomendadas" items={now} />}

      {/* Populares (carrusel) */}
      {!anyLoading && popular.length > 0 && <CarouselRow title="Populares" items={popular} />}

      {/* Mejor puntuadas (grilla de 10) */}
      {!anyLoading && top.length > 0 && (
        <section className="section">
          <h2 className="section-title">Mejor puntuadas</h2>
          <div className="movies-grid">
            {top.slice(0, 10).map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
