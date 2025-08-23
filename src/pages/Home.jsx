// src/pages/Home.jsx
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useMovies } from "../hooks/useMovies";
import { getImageUrl } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import "./Home.scss";

/** ===== HERO SLIDER (full width, adaptativo, flechas ocultas en mobile) ===== */
function HeroSlider({ items }) {
  const list = (items || []).slice(0, 5);
  const [idx, setIdx] = useState(0);
  if (!list.length) return null;

  const go = (delta) => setIdx((i) => (i + delta + list.length) % list.length);

  const slide = list[idx];
  const backdrop = getImageUrl(slide?.backdrop_path, "w1280");

  return (
    <section className="hero">
      <div
        className="hero__slide"
        style={{ backgroundImage: backdrop ? `url(${backdrop})` : undefined }}
      >
        <div className="hero__overlay" />

        <div className="hero__content container">
          <h2 className="hero__title">
            {slide?.title || "Película"}
            <small className="hero__year"> ({slide?.release_date?.slice(0, 4) || "—"})</small>
          </h2>

          <p className="hero__desc">
            {slide?.overview
              ? slide.overview.length > 260
                ? slide.overview.slice(0, 260) + "…"
                : slide.overview
              : "Sin descripción disponible."}
          </p>

          <Link className="hero__cta" to={`/detalle/${slide?.id}`}>
            Ver detalle →
          </Link>
        </div>

        {/* Flechas (ocultas en mobile via CSS) */}
        <button
          type="button"
          aria-label="Anterior"
          className="hero__arrow hero__arrow--left"
          onClick={() => go(-1)}
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Siguiente"
          className="hero__arrow hero__arrow--right"
          onClick={() => go(1)}
        >
          ›
        </button>

        {/* Puntos */}
        <div className="hero__dots">
          {list.map((_, i) => (
            <button
              key={i}
              className={`hero__dot ${i === idx ? "is-active" : ""}`}
              aria-label={`Ir al slide ${i + 1}`}
              onClick={() => setIdx(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/** ===== Carrusel horizontal reutilizable (10 ítems, centrado) ===== */
function CarouselRow({ title, items }) {
  const scrollerRef = useRef(null);
  const list = (items || []).slice(0, 10);
  if (!list.length) return null;

  const scrollBy = (px) => {
    scrollerRef.current?.scrollBy({ left: px, behavior: "smooth" });
  };

  return (
    <section className="section container">
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
  const { data: nowData, loading: nowLoading, error: nowError } = useMovies("now_playing", 1);
  const { data: popData, loading: popLoading, error: popError } = useMovies("popular", 1);
  const { data: topData, loading: topLoading, error: topError } = useMovies("top_rated", 1);

  const now = nowData?.results ?? [];
  const popular = popData?.results ?? [];
  const top = (topData?.results ?? []).slice(0, 10); // grilla de 10 (5 por fila)

  const anyLoading = nowLoading || popLoading || topLoading;
  const anyError = nowError || popError || topError;

  return (
    <main className="home">
      {anyLoading && <p className="home__status">Cargando datos de películas…</p>}
      {anyError && <p className="home__status error">Ocurrió un error al cargar Home.</p>}

      {/* HERO primero */}
      {!anyLoading && !anyError && !!now.length && <HeroSlider items={now} />}

      {/* Populares (carrusel) */}
      {!anyLoading && !anyError && !!popular.length && (
        <CarouselRow title="Populares" items={popular} />
      )}

      {/* Mejor puntuadas (grilla 10; 5 por fila en desktop) */}
      {!anyLoading && !anyError && !!top.length && (
        <section className="section container">
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
