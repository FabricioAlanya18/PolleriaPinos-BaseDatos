import React from "react";
import { useCart } from "../context/CartContext.jsx";

function ProductCard({ product }) {
  const { addToCart, cart } = useCart();
  const inCart = cart.some((item) => item.id === product.id);

  const priceNum = Number(product.precio) || 0;
  const fallbackImage = "/placeholder-local.png";

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img
          src={product.imagen || fallbackImage}
          alt={product.nombre}
          className="product-image"
          loading="eager"
        />
        <div className="product-price-tag">S/ {priceNum.toFixed(2)}</div>
      </div>
      <div className="product-body">
        <h3 className="product-name">{product.nombre}</h3>
        <p className="product-description">{product.descripcion}</p>
        <div className="product-footer">
          <span className="product-category">{product.categoria}</span>
          <button
            className={"btn-add-to-cart" + (inCart ? " added" : "")}
            onClick={() => addToCart(product)}
          >
            {inCart ? "✓ Agregado" : "🛒 Agregar al carrito"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
