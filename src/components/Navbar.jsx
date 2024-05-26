import React from "react";
import brIcon from "../images/bun_drop/br-icon.png";
import brLabel from "../images/bun_drop/br-label.png";

function Navbar() {
  return (
    <>
      <div>
        <div>
          <img src={brLabel} alt="BUN DROP" />
          <hr />
          <div>
            <h1>MENU</h1>
            <h1>ORDER</h1>
          </div>
        </div>
        <img src={brIcon} alt="BUN DROP" />
        <div>
          <div>
            <button>REGISTER</button>
            <button>LOG IN</button>
          </div>
          <hr />
          <div>
            <h1>ABOUT US</h1>
            <h1>FAQ</h1>
            <h1>CAREER</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
