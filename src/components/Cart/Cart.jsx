import React, { useState, useEffect } from "react";

import brOrderLabel from "@images/bun_drop/br-label.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

function Cart({
  cart,
  onUpdateQuantity,
  onRemoveProduct,
  onCheckout,
  isLocked,
  showCheckout,
}) {
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    if (isLocked) {
      setSelectedProductId(null);
    }
  }, [isLocked]);

  const handleProductClick = (product) => {
    if (!isLocked) {
      setSelectedProductId(
        selectedProductId === product.id ? null : product.id
      );
    }
  };

  const handleQuantityChange = (e, product) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity >= 0) {
      onUpdateQuantity(product.id, newQuantity);

      setSelectedProductId(product.id);
    }
  };

  // Beräkna totalbeloppet
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Beräkna moms (25%)
  const vatAmount = (totalAmount * 0.25).toFixed(2);

  // Räkna antalet produkter i korgen
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div id="cart-view-container">
      {cart.length > 0 && showCheckout && (
        <button onClick={onCheckout}>
          <h2>Checkout</h2>
          <h2>SEK {totalAmount.toFixed(2)}</h2>
        </button>
      )}
      <img src={brOrderLabel} alt="" />
      {cart.length === 0 ? (
        <>
          <p className="cart-empty">
            Select categories and products you would like to have dropped.
          </p>
        </>
      ) : (
        <>
          <div>
            <h2>My order</h2>
            <div>
              <p>{totalItems}</p>
              <FontAwesomeIcon icon={faBasketShopping} />
            </div>
          </div>
          <ul>
            {cart.map((item) => (
              <li key={item.id} onClick={() => handleProductClick(item)}>
                {item.title} - {item.quantity} x {item.price} :-
                {selectedProductId === item.id && !isLocked && (
                  <div>
                    <select
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(e, item)}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {[...Array(10).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveProduct(item.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div>
            <h2>Total amount</h2>
            <h2>SEK {totalAmount.toFixed(2)}</h2>
          </div>
          <div>
            <h2>VAT: 25%</h2>
            <h2>SEK {vatAmount}</h2>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
