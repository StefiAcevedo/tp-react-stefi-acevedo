import { useEffect, useState } from "react";
import { tmdbGet } from "../services/tmdb";

export function useMovieDetail(id) {
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    async function fetchData() {
      try {
        // detalle de la peli
        const detail = await tmdbGet(`/movie/${id}`);
        setMovie(detail);

        // videos (busco tráiler de YT si existe)
        const videos = await tmdbGet(`/movie/${id}/videos`);
        const trailerVideo = videos.results?.find(v => v.type === "Trailer" && v.site === "YouTube");
        setTrailer(trailerVideo || null);
      } catch (err) {
        console.error("[useMovieDetail]", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  return { movie, trailer, loading, error };
}
