import React, { useState, useEffect } from "react";

// Component
import OrderProduct from "./OrderProduct";

function OrderMenu({ onProductSelect }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/menu")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <div id="order-selection-container">
      <div id="order-category-container">
        <div className="order-category-title">
          <div className="bar-order"></div>
          <span>BURGERS</span>
          <div className="bar-order"></div>
        </div>
        <div id="order-selection-products">
          {products
            .filter((product) => product.category === "burgers")
            .map((p) => (
              <OrderProduct
                key={p.id}
                product={p}
                onProductSelect={onProductSelect}
              />
            ))}
        </div>
      </div>
      <div id="order-category-container">
        <div className="order-category-title">
          <div className="bar-order"></div>
          <span>SIDES</span>
          <div className="bar-order"></div>
        </div>
        <div id="order-selection-products">
          {products
            .filter((product) => product.category === "sides")
            .map((p) => (
              <OrderProduct
                key={p.id}
                product={p}
                onProductSelect={onProductSelect}
              />
            ))}
        </div>
      </div>
      <div id="order-category-container">
        <div className="order-category-title">
          <div className="bar-order"></div>
          <span>DIPS</span>
          <div className="bar-order"></div>
        </div>
        <div id="order-selection-products">
          {products
            .filter((product) => product.category === "dips")
            .map((p) => (
              <OrderProduct
                key={p.id}
                product={p}
                onProductSelect={onProductSelect}
              />
            ))}
        </div>
      </div>
      <div id="order-category-container">
        <div className="order-category-title">
          <div className="bar-order"></div>
          <span>SWEETS & SMOOTHIES</span>
          <div className="bar-order"></div>
        </div>
        <div id="order-selection-products">
          {products
            .filter((product) => product.category === "sweets")
            .map((p) => (
              <OrderProduct
                key={p.id}
                product={p}
                onProductSelect={onProductSelect}
              />
            ))}
        </div>
      </div>
      <div id="order-category-container">
        <div className="order-category-title">
          <div className="bar-order"></div>
          <span>DRINKS</span>
          <div className="bar-order"></div>
        </div>
        <div id="order-selection-products">
          {products
            .filter((product) => product.category === "drinks")
            .map((p) => (
              <OrderProduct
                key={p.id}
                product={p}
                onProductSelect={onProductSelect}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default OrderMenu;
