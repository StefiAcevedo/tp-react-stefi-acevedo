// src/hooks/useFavorites.js
import { useEffect, useState } from "react";

const LS_KEY = "fav_movies_v1";
const EVT = "favorites:updated";

function load() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function save(arr) {
  localStorage.setItem(LS_KEY, JSON.stringify(arr));
  // avisa a todos los componentes que cambió!
  window.dispatchEvent(new CustomEvent(EVT));
}

/** Guardamos lo esencial de la movie para no llenar localStorage */
function pickMovie(m) {
  return {
    id: m.id,
    title: m.title,
    poster_path: m.poster_path,
    release_date: m.release_date,
    vote_average: m.vote_average,
  };
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(load());

  // Sincroniza cuando cambia localStorage (otra pestaña)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === LS_KEY) setFavorites(load());
    };
    const onUpdated = () => setFavorites(load());

    window.addEventListener("storage", onStorage);
    window.addEventListener(EVT, onUpdated);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(EVT, onUpdated);
    };
  }, []);

  const isFav = (id) => favorites.some((f) => f.id === id);

  const add = (movie) => {
    if (isFav(movie.id)) return;
    const next = [...favorites, pickMovie(movie)];
    save(next);
    setFavorites(next);
  };

  const remove = (id) => {
    const next = favorites.filter((f) => f.id !== id);
    save(next);
    setFavorites(next);
  };

  const toggle = (movie) => {
    isFav(movie.id) ? remove(movie.id) : add(movie);
  };

  const clear = () => {
    save([]);
    setFavorites([]);
  };

  return {
    favorites,
    count: favorites.length,
    isFav,
    add,
    remove,
    toggle,
    clear,
  };
}
