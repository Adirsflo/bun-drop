import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cart from "../components/Cart/Cart";
import OrderMenu from "../components/Cart/OrderMenu";
import OrderCheckout from "../components/Cart/OrderCheckout";
import OrderDetails from "../components/Cart/OrderDetails";
import OrderPayment from "../components/Cart/OrderPayment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import localStorageManager from "../utils/localstoragemanager";

import "../components/Cart/Order.css";

function Order() {
  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState(false);
  const [details, setDetails] = useState(false);
  const [payment, setPayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("credit");
  const [deliveryAddress, setDeliveryAddress] = useState({
    address: "",
    city: "",
    zip: "",
  });
  const [userDetails, setUserDetails] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorageManager.getLocalStorage("cart");
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  useEffect(() => {
    localStorageManager.setLocalStorage("cart", cart);
  }, [cart]);

  const handleProductSelect = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      setCart(cart.filter((item) => item.id !== productId));
    } else {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemoveProduct = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const handleCheckout = () => {
    setCheckout(true);
  };

  const handlePaymentMethod = (method) => {
    setSelectedPayment(method);
  };

  const handleBack = () => {
    if (payment) {
      setPayment(false);
    } else if (details) {
      setDetails(false);
    } else if (checkout) {
      setCheckout(false);
    } else {
      navigate("/");
    }
  };

  const handleUserDetailsChange = (details) => {
    setUserDetails(details);
  };

  const currentHeader = () => {
    if (payment) {
      return "CHECKOUT - " + selectedPayment.toUpperCase();
    } else if (details) {
      return "YOUR DETAILS";
    } else if (checkout) {
      return "MY ORDER";
    } else {
      return "CHOOSE PRODUCTS";
    }
  };

  const orderDetails = {
    cart,
    deliveryAddress,
    userDetails,
  };

  return (
    <>
      <div id="order-view-container">
        <div id="order-view-left">
          <div id="order-nav">
            <button id="order-back-btn" onClick={handleBack}>
              <FontAwesomeIcon icon={faChevronLeft} className="faV-back" />
              <h1>Back</h1>
            </button>
            <h1>{currentHeader()}</h1>
          </div>
          {!checkout ? (
            <OrderMenu onProductSelect={handleProductSelect} />
          ) : payment ? (
            <OrderPayment
              selectedPayment={selectedPayment}
              orderDetails={orderDetails}
            />
          ) : details ? (
            <OrderDetails
              userDetails={userDetails}
              onNext={() => setPayment(true)}
              onUserDetailsChange={handleUserDetailsChange}
            />
          ) : (
            <OrderCheckout
              onPaymentMethodSelect={handlePaymentMethod}
              selectedPayment={selectedPayment}
              deliveryAddress={deliveryAddress}
              setDeliveryAddress={setDeliveryAddress}
              onNext={() => setDetails(true)}
            />
          )}
        </div>
        <div id="order-view-right-dummy"></div>
        <div id="order-view-right">
          <Cart
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveProduct={handleRemoveProduct}
            onCheckout={handleCheckout}
            isLocked={checkout || details || payment}
            showCheckout={!details && !payment && !checkout}
          />
        </div>
      </div>
    </>
  );
}

export default Order;
