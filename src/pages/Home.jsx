import React from "react";
import AreUHungry from "../components/AreUHungry";
import dropHamburger from "../images/products/drop-hamburger.png";
import favBurger1 from "../images/products/fav_burgers/burger-2.png";
import favBurger2 from "../images/products/fav_burgers/burger-3.png";
import favBurger3 from "../images/products/fav_burgers/burger-4.png";
import favBurger4 from "../images/products/fav_burgers/burger-6.png";
import favBurger5 from "../images/products/fav_burgers/burger-8.png";

function Home() {
  return (
    <>
      <div className="hero-container">
        <div id="drop-it-txt">
          <h1>DROP IT</h1>
          <h1>LIKE IT'S HOT</h1>
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
