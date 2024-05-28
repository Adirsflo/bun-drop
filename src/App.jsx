import React, { useState, useEffect } from "react";

// Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Product from "./pages/Product";
import Confirmation from "./pages/Confirmation";
import Receipt from "./pages/Receipt";
import Account from "./pages/Account";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// CSS & other
import "./App.css";
import "./images/font_awesome/font_awesome.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

import localStorageManager from "./utils/localstoragemanager";

function App() {
  // const [input, setInput] = useState("");
  // useEffect(() => {
  //   const cart = new localStorageManager.getLocalStorage();

  //   console.log(cart);
  // }, []);
  console.log(window.location.pathname);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:productId" element={<Product />} />
          <Route path="/order" element={<Order />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/account" element={<Account />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
