import React, { useState, useEffect } from "react";

// Router Navigate
import { useNavigate } from "react-router-dom";

// Components
import Cart from "../../components/Cart/Cart";
import OrderMenu from "../../components/Cart/OrderMenu";
import OrderCheckout from "../../components/Cart/OrderCheckout";
import OrderDetails from "../../components/Cart/OrderDetails";
import OrderPayment from "../../components/Cart/OrderPayment";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import localStorageManager from "../../utils/localstoragemanager";

// CSS
import "./Order.css";

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
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showCartModal, setShowCartModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const savedCart = localStorageManager.getLocalStorage("cart");
    if (savedCart) {
      setCart(savedCart);
    }
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setLoggedInUser(user);
      setUserDetails(user);
      setDeliveryAddress({
        address: user.address,
        city: user.city,
        zip: user.zip,
      });
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
    setShowCartModal(false);
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

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    setUserDetails({
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
    });
    setDeliveryAddress({
      address: "",
      city: "",
      zip: "",
    });
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

  const handleShowCartModal = () => {
    setShowCartModal(!showCartModal);
  };

  return (
    <>
      {isMobile ? (
        <div id="order-view-container-mobile">
          <div id="order-view-left-mobile">
            <div id="order-nav">
              <button id="order-back-btn-mobile" onClick={handleBack}>
                <FontAwesomeIcon icon={faChevronLeft} className="faV-back" />
                <h1>Back</h1>
              </button>
              <h1 id="currentHeader-mobile">{currentHeader()}</h1>
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
                onLogin={setLoggedInUser}
                loggedInUser={loggedInUser}
                userDetails={userDetails}
                setUserDetails={setUserDetails}
                onLogout={handleLogout}
              />
            )}
          </div>
          {!showCartModal && (
            <button id="checkout-btn-mobile" onClick={handleShowCartModal}>
              Cart
            </button>
          )}
          {showCartModal && (
            <>
              <div className="cart-modal">
                <div className="cart-modal-content">
                  <button
                    className="cart-modal-close-btn"
                    onClick={handleShowCartModal}
                  >
                    Back
                  </button>
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
          )}
        </div>
      ) : (
        <div id="order-view-container">
          <div id="order-view-left">
            <div id="order-nav">
              <button id="order-back-btn" onClick={handleBack}>
                <FontAwesomeIcon icon={faChevronLeft} className="faV-back" />
                <h1>Back</h1>
              </button>
              <h1 id="currentHeader">{currentHeader()}</h1>
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
                onLogin={setLoggedInUser}
                loggedInUser={loggedInUser}
                userDetails={userDetails}
                setUserDetails={setUserDetails}
                onLogout={handleLogout}
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
      )}
    </>
  );
}

export default Order;
