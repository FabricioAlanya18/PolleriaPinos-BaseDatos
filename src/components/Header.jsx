import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useCartDrawer } from "./CartDrawer.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function Header() {
  const { itemCount } = useCart();
  const { openDrawer } = useCartDrawer();
  const { user, signOut, openAuthModal } = useAuth();
  const [showMobileNav, setShowMobileNav] = useState(false);

  const navLinks = [
    { to: "/", label: "Inicio" },
    { to: "/menu", label: "Menú" },
    { to: "/promociones", label: "Promociones" },
    { to: "/nosotros", label: "Nosotros" },
    { to: "/contacto", label: "Contacto" },
  ];

  return (
    <header className="header">
      <div className="header-inner container">
        <div className="header-left">
          <div className="logo-badge">🍗</div>
          <div className="logo-text">
            <div className="logo-title">PINOS CHICKEN'S</div>
            <div className="logo-subtitle">Sabor que conquista</div>
          </div>
        </div>

        <nav className="nav">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-right">
          {user ? (
            <>
              <span className="user-chip">
                <span className="user-avatar">{user.email?.charAt(0)?.toUpperCase()}</span>
                <span className="user-email">{user.email}</span>
              </span>
              <button className="btn-outline" onClick={signOut}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <button className="btn-outline" onClick={() => openAuthModal("signin")}>
              Iniciar sesión
            </button>
          )}

          <button className="btn-cart" onClick={openDrawer}>
            <span className="cart-icon">🛒</span>
            <span>Carrito</span>
            <span className="badge">{itemCount}</span>
          </button>

          <button
            className="menu-toggle"
            onClick={() => setShowMobileNav((s) => !s)}
            aria-label="Menú"
          >
            ☰
          </button>
        </div>
      </div>

      {showMobileNav && (
        <div className="nav-mobile">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              onClick={() => setShowMobileNav(false)}
            >
              {link.label}
            </NavLink>
          ))}
          {user ? (
            <button className="btn-outline" onClick={signOut}>
              Cerrar sesión
            </button>
          ) : (
            <button className="btn-outline" onClick={() => openAuthModal("signin")}>
              Iniciar sesión
            </button>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
