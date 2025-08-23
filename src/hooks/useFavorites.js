import { useCallback, useEffect, useMemo, useState } from "react";

const LS_KEY = "fav_movies_v1";

export function useFavorites() {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const isFav = useCallback(
    (id) => items.some((m) => m.id === id),
    [items]
  );

  const add = useCallback((movie) => {
    setItems((prev) => (prev.some((m) => m.id === movie.id) ? prev : [...prev, movie]));
  }, []);

  const remove = useCallback((id) => {
    setItems((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const toggle = useCallback((movie) => {
    setItems((prev) =>
      prev.some((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie]
    );
  }, []);

  // compat: algunos componentes esperaban "list"
  return useMemo(
    () => ({ items, list: items, isFav, add, remove, toggle }),
    [items, isFav, add, remove, toggle]
  );
}
