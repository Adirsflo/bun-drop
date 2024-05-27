import React from "react";
import { Link } from "react-router-dom";
import brIcon from "../images/bun_drop/br-icon.png";
import brLabel from "../images/bun_drop/br-label.png";

function Navbar() {
  return (
    <>
      <div id="nav-wrapper">
        <div id="nav-left">
          <div id="label-container">
            <img className="brLabel" src={brLabel} alt="BUN DROP" />
          </div>
          <div id="nav-left-bottom">
            <Link className="font-jellee nav-size">MENU</Link>
            <Link className="font-jellee nav-size">ORDER</Link>
          </div>
        </div>
        <img className="brIcon" src={brIcon} alt="BUN DROP" />
        <div id="nav-right">
          <div id="nav-container-btn">
            <div id="nav-login">
              <Link to="/">
                <button className="btn-dark">REGISTER</button>
              </Link>
              <Link to="/">
                <button className="btn-dark">LOGIN</button>
              </Link>
            </div>
          </div>
          <div id="nav-right-bottom">
            <a className="font-jellee nav-size" href="#">
              ABOUT US
            </a>
            <a className="font-jellee nav-size" href="#">
              FAQ
            </a>
            <a className="font-jellee nav-size" href="#">
              CAREER
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
