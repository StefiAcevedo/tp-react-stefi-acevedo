// src/pages/Home.jsx
import { useRef } from "react";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";
import "./Home.scss";

function CarouselRow({ title, items }) {
  const scrollerRef = useRef(null);

  const scrollBy = (px) => {
    scrollerRef.current?.scrollBy({ left: px, behavior: "smooth" });
  };

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
          onClick={() => scrollBy(-600)}
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
          onClick={() => scrollBy(600)}
        >
          ›
        </button>
      </div>
    </section>
  );
}

export default function Home() {
  const { data: nowData,  loading: nowLoading,  error: nowError }  = useMovies("now_playing", 1);
  const { data: popData,  loading: popLoading,  error: popError }  = useMovies("popular", 1);
  const { data: topData,  loading: topLoading,  error: topError }  = useMovies("top_rated", 1);

  const now = nowData?.results ?? [];
  const popular = popData?.results ?? [];
  const top = topData?.results ?? [];

  const anyLoading = nowLoading || popLoading || topLoading;
  const anyError   = nowError   || popError   || topError;

  return (
    <main className="home container">
      {anyLoading && <p className="home__status">Cargando…</p>}
      {anyError && <p className="home__status error">Ocurrió un error al cargar Home.</p>}

      {!anyLoading && !anyError && (
        <>
          <CarouselRow title="Recomendadas" items={now} />
          <CarouselRow title="Populares" items={popular} />

          {!!top.length && (
            <section className="section">
              <h2 className="section-title">Mejor puntuadas</h2>
              <div className="movies-grid">
                {top.slice(0, 10).map((m) => (
                  <MovieCard key={m.id} movie={m} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
}
