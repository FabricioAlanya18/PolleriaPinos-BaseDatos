import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Home() {
  const { openAuthModal } = useAuth();

  return (
    <div className="page home-page">
      <section className="hero">
        <div>
          <h1 className="hero-title">
            SABOR QUE <span className="highlight">CONQUISTA</span>!
          </h1>
          <p className="hero-subtitle">
            Los mejores pollos a la brasa de Huancayo. Tradicion, sabor y calidad en cada bocado.
          </p>

          <div className="hero-badges">
            <span className="hero-badge-pill">15+ anios de experiencia</span>
            <span className="hero-badge-pill">1000+ clientes satisfechos</span>
            <span className="hero-badge-pill">Atencion rapida y segura</span>
          </div>

          <div className="hero-actions">
            <Link to="/menu">
              <button className="btn-primary hero-cta">🍗 Haz tu pedido ahora</button>
            </Link>
            <a href="tel:+51640123456">
              <button className="btn-outline hero-call">📞 Llamanos: (064) 123-456</button>
            </a>
          </div>

          <div className="hero-metrics">
            <div className="hero-metric">
              <strong>15+</strong>
              <div>Anios de sabor</div>
            </div>
            <div className="hero-metric">
              <strong>1000+</strong>
              <div>Pedidos al mes</div>
            </div>
            <div className="hero-metric">
              <strong>4.9★</strong>
              <div>Calificacion promedio</div>
            </div>
          </div>
        </div>

        <div className="hero-image-card">
          <img
            className="hero-image"
            src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/CAU42VL7CNGTNNO4M34A627VPM.jpg"
            alt="Pollo a la brasa"
          />
          <div className="hero-image-footer">
            <h3>Combo Familiar</h3>
            <p>1 pollo a la brasa + papas + ensalada + gaseosa de 1.5L</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Por que elegir Pinos Chicken&apos;s?</h2>
        <p className="section-subtitle">
          Combinamos una receta tradicional con ingredientes frescos, un ambiente acogedor y
          un servicio pensado para tu comodidad.
        </p>
      </section>
    </div>
  );
}

export default Home;
