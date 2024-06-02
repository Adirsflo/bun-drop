import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faPlus,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

function BurgerSelected({ product, onAdd, onBack }) {
  const [selectedSides, setSelectedSides] = useState([]);
  const [selectedDrinks, setSelectedDrinks] = useState([]);

  const handleAddSide = (side) => {
    setSelectedSides([...selectedSides, side]);
  };

  const handleAddDrink = (drink) => {
    setSelectedDrinks([...selectedDrinks, drink]);
  };

  return (
    <>
      <div id="burger-selected-container">
        <div>
          <button id="back-button" onClick={onBack}>
            <FontAwesomeIcon icon={faChevronLeft} className="faV-back" />
            <h1>Back</h1>
          </button>

          <h1>{product.title}</h1>

          <button onClick={() => onAdd(selectedSides, selectedDrinks)}>
            Add
          </button>
        </div>

        <div id="burger-selected-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div id="modification-container">
          <div>Modify ?</div>
          <input type="text" placeholder="Type your request" />
        </div>
        <div id="side-container">
          <div>Add side?</div>
          {product.sides.map((side, index) => (
            <div key={index} onClick={() => handleAddSide(side)}>
              <span>{side.name}</span>
              <span>{side.price}</span>
            </div>
          ))}
        </div>
        <div id="drink-container">
          <div>Add beverage?</div>
          {product.drinks.map((drink, index) => (
            <div key={index} onClick={() => handleAddDrink(drink)}>
              <span>{drink.name}</span>
              <span>{drink.price}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BurgerSelected;
