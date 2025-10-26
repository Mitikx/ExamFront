import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container">
      <div className="header">
        <h1>404 — Introuvable</h1>
      </div>
      <p>La ressource demandée est introuvable.</p>
      <Link className="back-btn" to="/">Retour à la liste</Link>
    </div>
  );
}
