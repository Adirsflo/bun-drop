import React, { useEffect, useState } from "react";

// Images
import mcIcon from "@images/payment/master-card-icon.webp";
import swishLogo from "@images/payment/swish-logo.png";

// Modal components
import AddressModal from "../modals/AdressModal";
import TimeModal from "../modals/TimeModal";
import LoginModal from "../modals/LoginModal";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHelicopterSymbol,
  faCheck,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faClock,
  faCalendarDays,
  faUser,
} from "@fortawesome/free-regular-svg-icons";

// Authorization hook
import { useAuth } from "../../hooks/AuthContext";

function OrderCheckout({
  onPaymentMethodSelect,
  selectedPayment,
  deliveryAddress,
  setDeliveryAddress,
  onNext,
}) {
  const [currentPayment, setCurrentPayment] = useState(selectedPayment);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState(
    "As soon as possible (ca 20 min)"
  );
  const [showModal, setShowModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const { user, login, logout } = useAuth();

  useEffect(() => {
    setCurrentPayment(selectedPayment);
  }, [selectedPayment]);

  useEffect(() => {
    if (user && user.contact) {
      setDeliveryAddress({
        address: user.contact.address,
        city: user.contact.city,
        zip: user.contact.zip,
      });
    }
  }, [user]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePaymentSelect = (method) => {
    setCurrentPayment(method);
    onPaymentMethodSelect(method);
  };

  const handleAddressClick = () => {
    setShowAddressModal(true);
  };

  const handleTimeClick = () => {
    setShowTimeModal(true);
  };

  const handleSaveAddress = (address) => {
    setDeliveryAddress(address);
  };

  const handleSaveTime = (time) => {
    setDeliveryTime(time);
  };

  const handleNextClick = () => {
    if (
      !deliveryAddress ||
      !deliveryAddress.address ||
      !deliveryAddress.city ||
      !deliveryAddress.zip
    ) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
      onNext();
    }
  };

  return (
    <div id="order-checkout-container">
      {showAddressModal && (
        <AddressModal
          onClose={() => setShowAddressModal(false)}
          onSave={handleSaveAddress}
        />
      )}
      {showTimeModal && (
        <TimeModal
          initialTime={deliveryTime}
          onClose={() => setShowTimeModal(false)}
          onSave={handleSaveTime}
        />
      )}
      <div className="next-btn-container">
        <button className="next-btn" onClick={handleNextClick}>
          Next
          <FontAwesomeIcon icon={faChevronRight} className="faV-right-next" />
        </button>
      </div>
      {showWarning && (
        <div className="warning">Please fill in all address fields</div>
      )}
      <h2 className="section-delivery-title">
        Select delivery address and time
      </h2>
      <div className="checkout-section-address">
        <div
          className="checkout-delivery"
          onClick={handleAddressClick}
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon
            icon={faHelicopterSymbol}
            className="checkout-icon"
          />
          <div className="checkout-delivery-information">
            <h4>Delivery address</h4>
            <h3>{deliveryAddress?.address || "No address selected"}</h3>
            <h3>
              {deliveryAddress?.city || ""} {deliveryAddress?.zip || ""}
            </h3>
          </div>
          <FontAwesomeIcon icon={faChevronRight} className="faV-right" />
        </div>
        <div
          className="checkout-time"
          onClick={handleTimeClick}
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon icon={faClock} className="checkout-icon" />
          <div>
            <h4>Ready time</h4>
            <button>
              <FontAwesomeIcon icon={faCalendarDays} className="faV-calendar" />
              <p>{deliveryTime}</p>
            </button>
          </div>
        </div>
      </div>
      <h2 className="section-payment-title">Pay with</h2>
      <div className="checkout-section-payment">
        <div
          className="checkout-credit"
          onClick={() => handlePaymentSelect("credit")}
          style={{ cursor: "pointer" }}
        >
          <div className="checkout-payment-row">
            <img src={mcIcon} alt="Mastercard" />
            <h3>Credit/debit card</h3>
          </div>
          {currentPayment === "credit" && (
            <FontAwesomeIcon icon={faCheck} className="payment-check-credit" />
          )}
        </div>
        <div
          className="checkout-swish"
          onClick={() => handlePaymentSelect("swish")}
          style={{ cursor: "pointer" }}
        >
          <div className="checkout-payment-row">
            <img src={swishLogo} alt="Swish" className="swish-logo" />
            <h3 id="swish-title">Swish</h3>
          </div>
          {currentPayment === "swish" && (
            <FontAwesomeIcon icon={faCheck} className="payment-check-swish" />
          )}
        </div>
      </div>
      <h2 className="section-login-title">Or log in</h2>
      <div className="dummy-line"></div>
      <div className="checkout-section-login">
        {user ? (
          <>
            <h2>Welcome, {user?.firstName || "Guest"}!</h2>
            <button className="btn-dark" onClick={() => logout()}>
              LOG OUT
            </button>
          </>
        ) : (
          <>
            <div
              className="checkout-login"
              onClick={openModal}
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faUser} className="checkout-icon" />
              <h3>Log in / register</h3>
              <FontAwesomeIcon icon={faChevronRight} className="faV-right" />
            </div>
          </>
        )}
      </div>
      {showModal && (
        <LoginModal
          isRegister={isRegister}
          setIsRegister={setIsRegister}
          closeModal={closeModal}
          onLogin={login}
        />
      )}
    </div>
  );
}

export default OrderCheckout;
