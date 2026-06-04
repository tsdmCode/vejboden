import { Link } from "react-router-dom";

export default function Forside() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <h1>Velkommen til Vejboden</h1>
      <p style={{ maxWidth: "600px", margin: "16px 0" }}>
        Kortet er nu flyttet til sin egen side. Gå til Kort for at se og administrere boder på kortet.
      </p>
      <Link
        to="/kort"
        style={{
          display: "inline-block",
          padding: "12px 24px",
          backgroundColor: "#2f80ed",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "600",
        }}
      >
        Åbn Kort
      </Link>
    </div>
  );
}
