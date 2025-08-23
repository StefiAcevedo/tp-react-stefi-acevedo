// src/hooks/useSearchMovies.js
import { useEffect, useState } from "react";
import { tmdbGet } from "../services/tmdb";

export function useSearchMovies(q, page = 1) {
  const [data, setData] = useState({ results: [], total_pages: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = (q || "").trim();
    if (!query) {
      setData({ results: [], total_pages: 1 });
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    tmdbGet("/search/movie", { query, page, language: "es-ES", include_adult: false })
      .then((json) => {
        if (cancelled) return;
        setData({
          results: json?.results ?? [],
          total_pages: json?.total_pages ?? 1,
        });
      })
      .catch((err) => !cancelled && setError(err))
      .finally(() => !cancelled && setLoading(false));

    return () => { cancelled = true; };
  }, [q, page]);

  return { data, loading, error };
}
