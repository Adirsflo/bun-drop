import React from "react";
import AreUHungry from "../components/AreUHungry";

function Home() {
  return (
    <>
      <div>
        <h1>Image Burger</h1>
        <h1>Drop it like its hot</h1>
      </div>
      <div>
        <h1>OUR FAVORITE DROPS</h1>
        <ul>
          <li>Burger 1</li>
          <li>Burger 2</li>
          <li>Burger 3</li>
          <li>Burger 4</li>
          <li>Burger 5</li>
        </ul>
      </div>
      <AreUHungry />
    </>
  );
}

export default Home;
