import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
// react router dom kommer här
// Komponenterna
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// CSS och annat
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { fas } from "@fortawesome/free-solid-svg-icons";
// TODO: Implementera så att regular icons också kan importeras
import "./App.css";
import localStorageManager from "./utils/localstoragemanager";

function App() {
  // const [input, setInput] = useState("");
  // useEffect(() => {
  //   const cart = new localStorageManager.getLocalStorage();

  //   console.log(cart);
  // }, []);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route />
          <Route />
          <Route />
        </Routes>
        <Footer />
      </Router>

      {/* <div>
        <FontAwesomeIcon icon={fas.faBasketShopping} />
      </div> */}
    </>
  );
}

export default App;
