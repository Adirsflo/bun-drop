import React from "react";
import drink from "../images/products/display/drink-6.png";
import burger from "../images/products/display/buger-1.png";
import "../App.css";

function AreUHungry() {
  return (
    <>
      <div id="hungry-container">
        <div id="hungry-left">
          <img id="drink-landing-img" src={drink} alt="" />
          <div className="are-you-hungry">
            <h1>ARE YOU HUNGRY?</h1>
            <button>MAKE A BUN DROP</button>
          </div>
        </div>
        <div id="hungry-right">
          <img src={burger} alt="" />
        </div>
      </div>
    </>
  );
}

export default AreUHungry;
