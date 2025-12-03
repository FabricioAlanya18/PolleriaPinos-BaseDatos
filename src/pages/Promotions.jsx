import React from "react";
import "../styles/Promotions.css";

const promoList = [
  {
    id: 1,
    tag: "2x1",
    badgeColor: "#facc15",
    title: "2x1 Medio Pollo",
    subtitle: "Todos los martes 2x1 en medio pollo a la brasa.",
    detail: "Válido todos los martes",
    detailIcon: "⏰",
    cta: "¡Oferta limitada!",
    ctaIcon: "⚡",
    image:
      "https://www.donbelisario.com.pe/media/catalog/product/2/x/2x1-belimostro-web_.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700&format=jpeg",
  },
  {
    id: 2,
    tag: "Especial",
    badgeColor: "#22c55e",
    title: "Combo Familiar Especial",
    subtitle: "Pollo entero + papas + ensalada + bebida gratis.",
    detail: "Válido fines de semana",
    detailIcon: "📅",
    cta: "¡Bebida incluida!",
    ctaIcon: "🥤",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    tag: "10% OFF",
    badgeColor: "#38bdf8",
    title: "Descuento Web",
    subtitle: "10% en todos los pedidos por la web con código WEB10.",
    detail: "Código: WEB10",
    detailIcon: "</>",
    cta: "¡Solo online!",
    ctaIcon: "🛒",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=80",
  },
];

function Promotions() {
  return (
    <div className="page promotions-page">
      <header className="promo-hero">
        <div className="promo-hero__icon">🔥</div>
        <div>
          <p className="promo-hero__eyebrow">Promociones especiales</p>
          <h1 className="promo-hero__title">Promociones Especiales</h1>
          <p className="promo-hero__subtitle">
            ¡No te pierdas nuestras increíbles ofertas! Ahorra más mientras disfrutas del mejor
            sabor.
          </p>
        </div>
      </header>

      <section className="promo-grid">
        {promoList.map((promo) => (
          <article key={promo.id} className="promo-card">
            <div className="promo-card__media">
              <img src={promo.image} alt={promo.title} />
              <span
                className="promo-card__badge"
                style={{ backgroundColor: promo.badgeColor, color: "#0b0b0b" }}
              >
                {promo.tag}
              </span>
            </div>

            <div className="promo-card__body">
              <h3 className="promo-card__title">{promo.title}</h3>
              <p className="promo-card__subtitle">{promo.subtitle}</p>

              <div className="promo-card__meta">
                <span className="promo-chip">
                  <span className="promo-chip__icon">{promo.detailIcon}</span>
                  {promo.detail}
                </span>
              </div>

              <div className="promo-card__footer">
                <span className="promo-card__cta">
                  <span className="promo-card__cta-icon">{promo.ctaIcon}</span>
                  {promo.cta}
                </span>
                <button className="promo-card__button">Ver detalles</button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default Promotions;
