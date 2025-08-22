// src/hooks/useSearchMovies.js
import { useEffect, useState } from "react";
import { tmdbGet } from "../services/tmdb";

export function useSearchMovies(query, page = 1) {
  const [data, setData] = useState({ results: [], page: 1, total_pages: 0, total_results: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // si no hay query, reseteamos y no llamamos a la API
    if (!query || !query.trim()) {
      setData({ results: [], page: 1, total_pages: 0, total_results: 0 });
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    tmdbGet("/search/movie", {
      query: query.trim(),
      page,
      language: "es-ES",
      include_adult: false,
    })
      .then((json) => {
        if (cancelled) return;
        setData({
          results: json?.results ?? [],
          page: json?.page ?? 1,
          total_pages: json?.total_pages ?? 0,
          total_results: json?.total_results ?? 0,
        });
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [query, page]);

  return { data, loading, error };
}
