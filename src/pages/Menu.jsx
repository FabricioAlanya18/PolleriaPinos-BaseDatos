import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient.js";
import ProductCard from "../components/ProductCard.jsx";
import "../styles/Menu.css";

const ALL_CATEGORIES = ["Todos", "Pollos", "Combos", "Complementos", "Bebidas"];

function Menu() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error | empty
  const [errorMessage, setErrorMessage] = useState("");
  const [category, setCategory] = useState("Todos");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setStatus("loading");
        setErrorMessage("");
        const { data, error } = await supabase
          .from("productos")
          .select("*")
          .order("id", { ascending: true });

        if (error) {
          console.error("[Supabase] Error cargando productos:", error);
          setErrorMessage("Ocurrió un error al cargar los productos.");
          setStatus("error");
          return;
        }

        console.log("Productos cargados desde Supabase:", data);
        console.table(data);

        if (!data || data.length === 0) {
          setStatus("empty");
          setProducts([]);
          return;
        }

        setProducts(data);
        setStatus("ready");
      } catch (err) {
        console.error("[Menú] Error inesperado:", err);
        setErrorMessage("Ocurrió un error inesperado.");
        setStatus("error");
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts =
    category === "Todos"
      ? products
      : products.filter(
          (p) => (p.categoria || "").toLowerCase() === category.toLowerCase()
        );

  return (
    <div className="page menu-page">
      <header className="menu-hero">
        <div className="menu-hero__icon">🍗</div>
        <div>
          <p className="menu-hero__eyebrow">Menú</p>
          <h1 className="menu-hero__title">Menú</h1>
          <p className="menu-hero__subtitle">
            Explora nuestros pollos, combos, complementos y bebidas. Todos los productos se cargan
            dinámicamente desde Supabase.
          </p>
        </div>
      </header>

      <div className="filter-bar menu-filters">
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={"filter-chip" + (category === cat ? " active" : "")}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {status === "loading" && <p className="status">Cargando productos...</p>}
      {status === "error" && <p className="status error">{errorMessage}</p>}
      {status === "empty" && <p className="status empty">No se encontraron productos.</p>}

      {status === "ready" && filteredProducts.length === 0 && (
        <p className="status empty">No hay productos en la categoría seleccionada.</p>
      )}

      {filteredProducts.length > 0 && (
        <section className="product-grid menu-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </div>
  );
}

export default Menu;
