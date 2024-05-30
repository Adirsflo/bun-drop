import React from "react";
import brOrderLabel from "@images/bun_drop/br-label.png";

function Cart() {
  return (
    <div id="cart-view-container">
      <img src={brOrderLabel} alt="" />
      <p className="cart-empty">
        Select categories and products you would like to have dropped.
      </p>
    </div>
  );
}

export default Cart;
