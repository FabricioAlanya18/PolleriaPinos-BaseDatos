import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient.js";

const CartContext = createContext();

const CART_STORAGE_KEY = "pinos_cart";
const SESSION_STORAGE_KEY = "pinos_session_id";

// Genera un id de sesión simple (no usa librerías externas)
function generateSessionId() {
  return (
    "sess_" +
    Math.random().toString(36).slice(2) +
    Date.now().toString(36)
  );
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Cargar carrito y sessionId desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    const storedSession = localStorage.getItem(SESSION_STORAGE_KEY);
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch {
        setCart([]);
      }
    }
    if (storedSession) {
      setSessionId(storedSession);
    } else {
      const newId = generateSessionId();
      setSessionId(newId);
      localStorage.setItem(SESSION_STORAGE_KEY, newId);
    }
  }, []);

  // Guardar en localStorage y sincronizar con Supabase cada vez que cambie el carrito
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    if (!sessionId) return;
    syncCartWithSupabase(cart, sessionId);
  }, [cart, sessionId]);

  async function syncCartWithSupabase(cartItems, currentSessionId) {
    try {
      setIsSyncing(true);
      // Estrategia sencilla:
      // 1. Borrar items anteriores de este session_id
      // 2. Insertar el estado actual del carrito
      const { error: deleteError } = await supabase
        .from("carrito_items")
        .delete()
        .eq("session_id", currentSessionId);

      if (deleteError) {
        console.warn("[Carrito] Error eliminando items antiguos:", deleteError);
      }

      if (cartItems.length === 0) {
        setIsSyncing(false);
        return;
      }

      const payload = cartItems.map((item) => ({
        session_id: currentSessionId,
        product_id: item.id,
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.cantidad,
      }));

      const { error: insertError } = await supabase.from("carrito_items").insert(payload);

      if (insertError) {
        console.error("[Carrito] Error sincronizando carrito:", insertError);
      } else {
        console.log("[Carrito] Carrito sincronizado con Supabase.");
      }
    } catch (err) {
      console.error("[Carrito] Error inesperado al sincronizar:", err);
    } finally {
      setIsSyncing(false);
    }
  }

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          nombre: product.nombre,
          precio: Number(product.precio) || 0,
          cantidad: 1,
        },
      ];
    });
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }

  function updateQuantity(productId, delta) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, cantidad: Math.max(1, item.cantidad + delta) }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  }

  function clearCart() {
    setCart([]);
  }

  const itemCount = cart.reduce((sum, item) => sum + item.cantidad, 0);
  const total = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount,
    total,
    isSyncing,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return ctx;
}
