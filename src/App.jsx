import React, { useState, useEffect } from "react";

// Router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Product from "./pages/Product";
import Confirmation from "./pages/Confirmation";
import Receipt from "./pages/Receipts.jsx";
import Account from "./pages/Account";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackgroundChanger from "./hooks/BackgroundChanger.jsx";
import { AuthProvider } from "./hooks/AuthContext.jsx";

// CSS & other
import "./App.css";
import "@images/font_awesome/font_awesome.js";

function AppContent() {
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState("");

  useEffect(() => {
    const { pathname } = location;
    setCurrentLocation(pathname);
  }, [location]);

  return (
    <>
      <BackgroundChanger />
      {currentLocation === "/order" ? null : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:productId" element={<Product />} />
        <Route path="/order" element={<Order />} />
        <Route path="/confirmation/:receiptId" element={<Confirmation />} />
        <Route path="/receipts" element={<Receipt />} />
        <Route path="/account" element={<Account />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {currentLocation === "/order" ? null : <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
