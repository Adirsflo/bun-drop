import React from "react";

// Component
import AreUHungry from "../../components/AreUHungry";

// Images
import dropHamburger from "@images/display/drop-hamburger.png";
import favBurger1 from "@images/display/fav_burgers/burger-2.png";
import favBurger2 from "@images/display/fav_burgers/burger-3.png";
import favBurger3 from "@images/display/fav_burgers/burger-4.png";
import favBurger4 from "@images/display/fav_burgers/burger-6.png";
import favBurger5 from "@images/display/fav_burgers/burger-8.png";

// CSS
import "./Home.css";

function Home() {
  return (
    <>
      <div className="hero-container">
        <div id="drop-it-txt">
          <h1 id="drop-text1">DROP IT</h1>
          <h1 id="drop-text2">LIKE IT'S HOT</h1>
        </div>
        <img id="drop-hamburger" src={dropHamburger} alt="" />
      </div>

      <div id="favorite-container">
        <h1>OUR FAVORITE DROPS</h1>
        <ul className="favorite-burgers">
          <li>
            <img className="favorite-burger-img" src={favBurger1} alt="" />
          </li>
          <li>
            <img className="favorite-burger-img" src={favBurger2} alt="" />
          </li>
          <li>
            <img className="favorite-burger-img" src={favBurger3} alt="" />
          </li>
          <li>
            <img className="favorite-burger-img" src={favBurger4} alt="" />
          </li>
          <li>
            <img className="favorite-burger-img" src={favBurger5} alt="" />
          </li>
        </ul>
      </div>
      <AreUHungry />
    </>
  );
}

export default Home;
