import React from "react";

// Router Link
import { Link } from "react-router-dom";

// Images
import drink from "../images/display/drink-6.png";
import burger from "../images/display/buger-1.png";

// CSS
import "../App.css";

function AreUHungry() {
  return (
    <>
      <div id="hungry-container">
        <div id="hungry-left">
          <img id="drink-landing-img" src={drink} alt="" />
          <div className="are-you-hungry">
            <h1>ARE YOU HUNGRY?</h1>
            <Link to="/order">
              <button id="make-bundrop-btn">MAKE A BUN DROP</button>
            </Link>
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
