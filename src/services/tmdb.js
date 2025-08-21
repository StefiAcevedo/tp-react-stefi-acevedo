const API_BASE = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// GET con params seguros (arma bien la URL)
export async function tmdbGet(path, params = {}) {
  const url = new URL(API_BASE + path);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("language", "es-ES");
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("region", "AR");
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, v);
  });

  const res = await fetch(url.toString(), { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`TMDB error ${res.status}`);
  return res.json();
}

// helper de imágenes
export function getImageUrl(path, size = "w342") {
  if (!path) return "";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
