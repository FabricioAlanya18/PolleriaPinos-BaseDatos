import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Página no encontrada</h1>
        <p>La ruta que intentas visitar no existe.</p>
      </header>

      <section className="section">
        <Link to="/">
          <button className="btn-primary">Volver al inicio</button>
        </Link>
      </section>
    </div>
  );
}

export default NotFound;
