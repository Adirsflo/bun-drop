import React, { useState, useEffect } from "react";
import MenuProduct from "../components/MenuProduct";

function Menu() {
  const [products, setProducts] = useState([]);
  // const [burgers, setBurgers] = useState("burgers");
  // const [sides, setSides] = useState("burgers");
  // const [dips, setDips] = useState("burgers");
  // const [sweets, setSweets] = useState("burgers");
  // const [drinks, setDrinks] = useState("burgers");

  useEffect(() => {
    fetch("http://localhost:3001/menu")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  }, []);

  // const filteredBurgers =
  //   setBurgers[products.filter((p) => p.category === burgers)];
  // const filteredSides = products.filter((p) => p.category === sides);
  // const filteredDips = products.filter((p) => p.category === dips);
  // const filteredSweets = products.filter((p) => p.category === sweets);
  // const filteredDrinks = products.filter((p) => p.category === drinks);

  return (
    <>
      <div id="menu-border">
        <div>
          <h1>MENU</h1>
        </div>
        <div>
          <ul>
            <li>BURGERS</li>
            <li>SIDES</li>
            <li>DIPS</li>
            <li>SWEETS & SMOOTHIES</li>
            <li>DRINKS</li>
          </ul>
        </div>
      </div>

      <div id="product-container">
        <div id="category-container">
          <div className="category-title">
            <div className="bar"></div>
            <span>BURGERS</span>
            <div className="bar"></div>
          </div>
          <div id="menu-products">
            {products
              .filter((product) => product.category === "burgers")
              .map((p) => (
                <MenuProduct key={p.id} product={p} />
              ))}
          </div>
        </div>
        <div id="category-container">
          <div className="category-title">
            <div className="bar"></div>
            <span>SIDES</span>
            <div className="bar"></div>
          </div>
          <div id="menu-products">
            {products
              .filter((product) => product.category === "sides")
              .map((p) => (
                <MenuProduct key={p.id} product={p} />
              ))}
          </div>
        </div>
        <div id="category-container">
          <div className="category-title">
            <div className="bar"></div>
            <span>DIPS</span>
            <div className="bar"></div>
          </div>
          <div id="menu-products">
            {products
              .filter((product) => product.category === "dips")
              .map((p) => (
                <MenuProduct key={p.id} product={p} />
              ))}
          </div>
        </div>
        <div id="category-container">
          <div className="category-title">
            <div className="bar"></div>
            <span>SWEETS & SMOOTHIES</span>
            <div className="bar"></div>
          </div>
          <div id="menu-products">
            {products
              .filter((product) => product.category === "sweets")
              .map((p) => (
                <MenuProduct key={p.id} product={p} />
              ))}
          </div>
        </div>
        <div id="category-container">
          <div className="category-title">
            <div className="bar"></div>
            <span>DRINKS</span>
            <div className="bar"></div>
          </div>
          <div id="menu-products">
            {products
              .filter((product) => product.category === "drinks")
              .map((p) => (
                <MenuProduct key={p.id} product={p} />
              ))}
          </div>
        </div>
      </div>

      {/* <div>
        <h1>{burgers.toUpperCase()}</h1>
        {filteredBurgers.map((p) => (
          <MenuProduct key={p.id} product={p} />
        ))}
      </div>
      <div>
        <h1>{sides.toUpperCase()}</h1>
        {filteredSides.map((p) => (
          <MenuProduct key={p.id} product={p} />
        ))}
      </div> */}
    </>
  );
}

export default Menu;
