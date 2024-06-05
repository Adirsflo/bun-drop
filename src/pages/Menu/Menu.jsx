import React, { useState, useEffect } from "react";

// Components
import AreUHungry from "../../components/AreUHungry";
import MenuProduct from "../../components/MenuProduct";

// CSS
import "./Menu.css";

function Menu() {
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/menu")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((cat) => cat !== category)
        : [...prevSelected, category]
    );
  };

  const categories = ["burgers", "sides", "dips", "sweets", "drinks"];

  const filteredProducts = selectedCategories.length
    ? products.filter((product) =>
        selectedCategories.includes(product.category)
      )
    : products;

  return (
    <>
      <div id="menu-border">
        <div>
          <h1>MENU</h1>
        </div>
        <div>
          <ul>
            {categories.map((category) => (
              <li
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={
                  selectedCategories.includes(category)
                    ? "selected-category-filter"
                    : ""
                }
                style={{ cursor: "pointer" }}
              >
                {category.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div id="product-container">
        {categories.map((category) =>
          selectedCategories.length === 0 ||
          selectedCategories.includes(category) ? (
            <div key={category} id="category-container">
              <div className="category-title">
                <div className="bar"></div>
                <span>{category.toUpperCase()}</span>
                <div className="bar"></div>
              </div>
              <div id="menu-products">
                {filteredProducts
                  .filter((product) => product.category === category)
                  .map((p) => (
                    <MenuProduct key={p.id} product={p} />
                  ))}
              </div>
            </div>
          ) : null
        )}
        <AreUHungry />
      </div>
    </>
  );
}

export default Menu;
