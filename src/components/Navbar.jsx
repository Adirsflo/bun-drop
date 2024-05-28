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
            <Link to="/">
              <img className="brLabel" src={brLabel} alt="BUN DROP" />
            </Link>
          </div>
          <div id="nav-left-bottom">
            <Link className="font-jellee nav-size" to="/menu">
              MENU
            </Link>
            <Link className="font-jellee nav-size" to="/order">
              ORDER
            </Link>
          </div>
        </div>
        <Link to="/">
          <img className="brIcon" src={brIcon} alt="BUN DROP" />
        </Link>
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
            <a className="font-jellee nav-size" href="*">
              ABOUT US
            </a>
            <a className="font-jellee nav-size" href="*">
              FAQ
            </a>
            <a className="font-jellee nav-size" href="*">
              CAREER
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
