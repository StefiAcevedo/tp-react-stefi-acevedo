export default function Card({ personaje }) {
    console.log("[DEBUG] Render Card ->", personaje?.name);
    return (
      <article
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "0.5rem",
          textAlign: "center",
          background: "#fafafa",
        }}
      >
        <img
          src={personaje.image}
          alt={personaje.name}
          style={{ width: "100%", borderRadius: "8px" }}
        />
        <h3>{personaje.name}</h3>
      </article>
    );
  }
  