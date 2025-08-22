// src/pages/Home.jsx
import "./Home.scss";
import MovieCard from "../components/MovieCard";
import { useMovies } from "../hooks/useMovies";

export default function Home() {
  // Traemos 3 listas (página 1)
  const { data: nowData, loading: l1, error: e1 } = useMovies("now_playing", 1);
  const { data: popData, loading: l2, error: e2 } = useMovies("popular", 1);
  const { data: topData, loading: l3, error: e3 } = useMovies("top_rated", 1);

  const loading = l1 || l2 || l3;
  const error = e1 || e2 || e3;

  const now = nowData?.results?.slice(0, 5) ?? [];
  const popular = popData?.results?.slice(0, 10) ?? [];
  const topRated = topData?.results?.slice(0, 10) ?? [];

  return (
    <section className="home container">
      <h1>Home</h1>

      {loading && <p>Cargando…</p>}
      {error && !loading && <p>Error: {String(error)}</p>}

      {!loading && !error && (
        <>
          {/* Slider simple (con scroll) */}
          <section className="home__block">
            <h2>Recomendadas (Now Playing)</h2>
            <div className="slider" tabIndex={0} aria-label="Películas recomendadas">
              <div className="slider__track">
                {now.map((m) => (
                  <MovieCard key={m.id} movie={m} />
                ))}
              </div>
            </div>
          </section>

          {/* Lista: Populares (10) */}
          <section className="home__block">
            <h2>Populares</h2>
            <div className="movies-grid">
              {popular.map((m) => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          </section>

          {/* Lista: Mejor puntuadas (solo 10) */}
          <section className="home__block">
            <h2>Mejor puntuadas</h2>
            <div className="movies-grid">
              {topRated.map((m) => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          </section>
        </>
      )}
    </section>
  );
}
