import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import Cart from "../components/Cart/Cart";
import OrderMenu from "../components/Cart/OrderMenu";
import BurgerSelected from "../components/Cart/BurgerSelected";
import SugestedDip from "../components/Cart/SugestedDip";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function Order() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showBurgerSelected, setShowBurgerSelected] = useState(false);
  const [showSugestedDip, setShowSugestedDip] = useState(false);

  // Reset state when component mounts
  useEffect(() => {
    setSelectedProduct(null);
    setShowBurgerSelected(false);
    setShowSugestedDip(false);
  }, []);

  // Handle product of choice
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    if (product.category === "burgers") {
      setShowBurgerSelected(true);
      setShowSugestedDip(false);
    } else {
      setShowBurgerSelected(false);
      setShowSugestedDip(true);
    }
  };

  // Handle the Back-button
  const handleBackClick = () => {
    if (showSugestedDip) {
      setShowSugestedDip(false);
      setShowBurgerSelected(true);
    } else {
      setSelectedProduct(null);
      setShowBurgerSelected(false);
    }
  };

  // Handle the Add-button
  const handleAddClick = () => {
    setShowSugestedDip(true);
    setShowBurgerSelected(false);
  };

  // Handle the Continue-button
  const handleContinueClick = () => {
    setSelectedProduct(null);
    setShowSugestedDip(false);
  };

  return (
    <>
      <div id="order-view-container">
        <div id="order-view-left">
          {!selectedProduct && (
            <>
              <button id="order-back-btn">
                <Link to="/">
                  <FontAwesomeIcon icon={faChevronLeft} className="faV-back" />
                  <h1>Back</h1>
                </Link>
              </button>
              <OrderMenu onProductSelect={handleProductSelect} />
            </>
          )}
          {selectedProduct && showBurgerSelected && (
            <BurgerSelected
              product={selectedProduct}
              onAdd={handleAddClick}
              onBack={handleBackClick}
            />
          )}
          {selectedProduct && showSugestedDip && (
            <SugestedDip onContinue={handleContinueClick} />
          )}
        </div>
        <div id="order-view-right-dummy"></div>
        <div id="order-view-right">
          <Cart></Cart>
        </div>
      </div>
    </>
  );
}

export default Order;
