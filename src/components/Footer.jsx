import React from "react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>
          &copy; {year} Pinos Chicken&apos;s. Todos los derechos reservados.
        </p>
        <p>Proyecto académico – React + Vite + Supabase.</p>
      </div>
    </footer>
  );
}

export default Footer;
