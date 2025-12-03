// src/components/CartDrawer.jsx
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const CartDrawerContext = createContext(null);

export function useCartDrawer() {
  const ctx = useContext(CartDrawerContext);
  if (!ctx) {
    throw new Error("useCartDrawer debe usarse dentro de CartDrawerProvider");
  }
  return ctx;
}

// Provider para abrir/cerrar el panel
export function CartDrawerProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = {
    isOpen,
    openDrawer: () => setIsOpen(true),
    closeDrawer: () => setIsOpen(false),
  };

  return <CartDrawerContext.Provider value={value}>{children}</CartDrawerContext.Provider>;
}

// Componente visual del carrito
function CartDrawerInner() {
  const { isOpen, closeDrawer } = useCartDrawer();
  const { cart, updateQuantity, removeFromCart, total, isSyncing, clearCart } = useCart();
  const { user, openAuthModal } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (!user) {
      openAuthModal("signin");
      return;
    }
    alert("Listo para proceder al pago (usuario autenticado).");
    clearCart();
    closeDrawer();
    navigate("/");
  };

  return (
    <div className="cart-overlay" onClick={closeDrawer}>
      <div
        className="cart-panel"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="cart-header">
          <div>
            <div className="cart-title">Tu Carrito</div>
            {isSyncing && (
              <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                Sincronizando con Supabase...
              </div>
            )}
          </div>
          <button
            onClick={closeDrawer}
            className="btn-outline"
            style={{ padding: "0.3rem 0.7rem" }}
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="status empty">Tu carrito está vacío.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <div className="cart-item-name">{item.nombre}</div>
                  <div className="cart-item-price">
                    S/ {item.precio.toFixed(2)} x {item.cantidad}
                  </div>
                </div>
                <div>
                  <div className="cart-item-qty">
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>
                      -
                    </button>
                    <span style={{ minWidth: 20, textAlign: "center" }}>{item.cantidad}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>
                      +
                    </button>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total-row">
            <span className="cart-total-label">Total:</span>
            <span className="cart-total-value">S/ {total.toFixed(2)}</span>
          </div>
          <button className="btn-checkout" onClick={handleCheckout}>
            🛒 Proceder al Pago
          </button>
        </div>
      </div>
    </div>
  );
}

// Componente que usas en App.jsx (no vuelve a crear provider)
export function CartDrawer() {
  return <CartDrawerInner />;
}

export default CartDrawer;
