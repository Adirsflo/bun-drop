import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { useAuth } from "../hooks/AuthContext";

function Favorites() {
  const { user, addFavorite, removeFavorite } = useAuth();
  const [categories, setCategories] = useState({
    burgers: [],
    sides: [],
    dips: [],
    sweets: [],
    drinks: [],
  });
  const [selectedCategory, setSelectedCategory] = useState("burgers");
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    if (user) {
      const categorizedFavorites = {
        burgers: user.favorites.filter((fav) => fav.category === "burgers"),
        sides: user.favorites.filter((fav) => fav.category === "sides"),
        dips: user.favorites.filter((fav) => fav.category === "dips"),
        sweets: user.favorites.filter((fav) => fav.category === "sweets"),
        drinks: user.favorites.filter((fav) => fav.category === "drinks"),
      };
      setCategories(categorizedFavorites);

      const firstNonEmptyCategory = Object.keys(categorizedFavorites).find(
        (category) => categorizedFavorites[category].length > 0
      );
      setSelectedCategory(firstNonEmptyCategory || "burgers");
    }
  }, [user]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleFavoriteClick = (product) => {
    const isFavorite = user.favorites.some((fav) => fav.id === product.id);

    if (isFavorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  if (!user) {
    return <h1>PLEASE LOG IN TO VIEW FAVORITES</h1>;
  }

  return (
    <>
      <div>
        <h2>MY FAVORITES</h2>
        <div>
          <div onClick={() => handleCategorySelect("burgers")}>
            <h3>BURGERS</h3>
            <h3>QUANTITY: {categories.burgers.length}</h3>
          </div>
          <div onClick={() => handleCategorySelect("sides")}>
            <h3>SIDES</h3>
            <h3>QUANTITY: {categories.sides.length}</h3>
          </div>
          <div onClick={() => handleCategorySelect("dips")}>
            <h3>DIPS</h3>
            <h3>QUANTITY: {categories.dips.length}</h3>
          </div>
          <div onClick={() => handleCategorySelect("sweets")}>
            <h3>SWEETS & SMOOTHIES</h3>
            <h3>QUANTITY: {categories.sweets.length}</h3>
          </div>
          <div onClick={() => handleCategorySelect("drinks")}>
            <h3>DRINKS</h3>
            <h3>QUANTITY: {categories.drinks.length}</h3>
          </div>
        </div>
      </div>
      <div>
        {categories[selectedCategory].map((product) => (
          <div key={product.id}>
            <img src={product.image} alt={product.title} />
            <h4>{product.title}</h4>
            <div
              onMouseEnter={() => setHoveredItem(product.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleFavoriteClick(product)}
              className="heart-fav-container"
            >
              <FontAwesomeIcon
                icon={
                  user.favorites.some((fav) => fav.id === product.id)
                    ? hoveredItem === product.id
                      ? farHeart
                      : fasHeart
                    : hoveredItem === product.id
                    ? fasHeart
                    : farHeart
                }
                className={`heart-icon-fav ${
                  user.favorites.some((fav) => fav.id === product.id)
                    ? "favorite"
                    : ""
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Favorites;
