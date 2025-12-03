import React from "react";
import "../styles/Contact.css";

const address = {
  line1: "Av. Mariscal Castilla N° 4146",
  line2: "Tambo 12006, Huancayo",
  link: "https://maps.google.com",
};

const contacts = [
  { icon: "💬", label: "WhatsApp", value: "+51 954 421 152" },
  { icon: "📞", label: "Teléfono", value: "+51 945 482 123" },
  { icon: "✉️", label: "Correo", value: "info@pinoschickens.com" },
];

const schedule = {
  days: "Lunes a Domingo",
  hours: "11:00 AM - 10:00 PM",
  note: "¡Delivery hasta las 9:30 PM!",
};

function Contact() {
  return (
    <div className="page contact-page">
      <header className="contact-hero">
        <div className="contact-hero__icon">📍</div>
        <div>
          <p className="contact-hero__eyebrow">Encuéntranos</p>
          <h1 className="contact-hero__title">Encuéntranos</h1>
          <p className="contact-hero__subtitle">
            Visítanos o contáctanos para hacer tu pedido y disfrutar de nuestro mejor sabor.
          </p>
        </div>
      </header>

      <section className="contact-grid">
        <div className="contact-grid__left">
          <div className="contact-card">
            <div className="contact-card__header">
              <span className="contact-card__icon">📍</span>
              <h3>Dirección</h3>
            </div>
            <p className="contact-card__text">{address.line1}</p>
            <p className="contact-card__text">{address.line2}</p>
            <a className="contact-link" href={address.link} target="_blank" rel="noreferrer">
              Ver en Google Maps
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-card__header">
              <span className="contact-card__icon">☎️</span>
              <h3>Contacto</h3>
            </div>
            <ul className="contact-list">
              {contacts.map((item) => (
                <li key={item.value} className="contact-list__item">
                  <span className="contact-list__icon">{item.icon}</span>
                  <span className="contact-list__label">{item.label}:</span>
                  <span className="contact-list__value">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="contact-card">
            <div className="contact-card__header">
              <span className="contact-card__icon">⏰</span>
              <h3>Horarios</h3>
            </div>
            <p className="contact-card__text">{schedule.days}</p>
            <p className="contact-hours">{schedule.hours}</p>
            <p className="contact-note">{schedule.note}</p>
          </div>
        </div>

        <div className="contact-grid__right">
          <div className="contact-card contact-form">
            <h3 className="contact-form__title">Envíanos un mensaje</h3>
            <form className="contact-form__body">
              <label className="contact-field">
                <span>Nombre completo</span>
                <input type="text" name="name" placeholder="Tu nombre" />
              </label>

              <label className="contact-field">
                <span>Correo electrónico</span>
                <input type="email" name="email" placeholder="tu@email.com" />
              </label>

              <label className="contact-field">
                <span>Teléfono</span>
                <input type="tel" name="phone" placeholder="+51 900 000 000" />
              </label>

              <label className="contact-field">
                <span>Mensaje</span>
                <textarea name="message" rows="4" placeholder="Cuéntanos qué necesitas" />
              </label>

              <button type="submit" className="contact-submit">
                ✈ Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="contact-social">
        <h3 className="contact-social__title">Síguenos en redes sociales</h3>
        <div className="contact-social__buttons">
          <a className="social-btn fb" href="https://facebook.com" target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a
            className="social-btn ig"
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a className="social-btn tt" href="https://tiktok.com" target="_blank" rel="noreferrer">
            TikTok
          </a>
        </div>
      </section>
    </div>
  );
}

export default Contact;
