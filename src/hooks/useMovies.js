import { useEffect, useState } from "react";
import { tmdbGet } from "../services/tmdb";

// type: "now_playing" | "popular" | "top_rated" | "upcoming"
export function useMovies(type = "now_playing", page = 1) {
  const [data, setData] = useState({ results: [], page: 1, total_pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);

    tmdbGet(`/movie/${type}`, { page })
      .then(json => { if (alive) setData(json || { results: [], page: 1, total_pages: 1 }); })
      .catch(err => { if (alive) setError(err?.message || "Error"); })
      .finally(() => { if (alive) setLoading(false); });

    return () => { alive = false; };
  }, [type, page]);

  return { data, loading, error };
}
