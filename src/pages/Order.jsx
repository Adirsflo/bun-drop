import React from "react";
import Cart from "../components/Cart/Cart";
import OrderMenu from "../components/Cart/OrderMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faV } from "@fortawesome/free-solid-svg-icons";

function Order() {
  return (
    <>
      <div id="order-view-container">
        <div id="order-view-left">
          <button id="order-back-btn">
            <FontAwesomeIcon icon={faV} className="faV-back" />
            <h1>Back</h1>
          </button>
          <OrderMenu></OrderMenu>
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
