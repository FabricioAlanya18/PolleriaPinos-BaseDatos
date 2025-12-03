import React from "react";
import "../styles/About.css";

const pillars = [
  { icon: "🌿", title: "Ingredientes frescos y naturales" },
  { icon: "🔥", title: "Cocción a la brasa tradicional" },
  { icon: "⚡", title: "Servicio rápido y eficiente" },
  { icon: "🛵", title: "Delivery en toda la ciudad" },
];

function About() {
  return (
    <div className="page about-page">
      <section className="about-hero">
        <div className="about-hero__content">
          <div className="about-eyebrow">Nuestro origen</div>
          <div className="about-title-wrap">
            <span className="about-title__icon">❤️</span>
            <div>
              <p className="about-kicker">Nuestra historia</p>
              <h1 className="about-title">Nuestra Historia</h1>
            </div>
          </div>

          <p className="about-lead">
            Desde hace más de 15 años, Pinos Chicken&apos;s ha sido sinónimo de calidad y tradición en
            Huancayo. Nuestro secreto está en la receta familiar que se ha transmitido de generación
            en generación, combinando los mejores ingredientes con técnicas clásicas de cocción.
          </p>

          <ul className="about-pillar-list">
            {pillars.map((item) => (
              <li key={item.title} className="about-pillar-item">
                <span className="about-pillar__icon">{item.icon}</span>
                <span className="about-pillar__text">{item.title}</span>
              </li>
            ))}
          </ul>

          <div className="about-badges">
            <div className="about-badge">
              <span className="about-badge__label">15+ años</span>
              <span className="about-badge__text">Sabor que conquista</span>
            </div>
            <div className="about-badge">
              <span className="about-badge__label">1000+</span>
              <span className="about-badge__text">Pedidos al mes</span>
            </div>
            <div className="about-badge">
              <span className="about-badge__label">4.9★</span>
              <span className="about-badge__text">Calificación promedio</span>
            </div>
          </div>
        </div>

        <div className="about-hero__image">
          <div className="about-image-frame">
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80"
              alt="Chef preparando pollo a la brasa"
            />
            <div className="about-image-tag">Tradición familiar</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
