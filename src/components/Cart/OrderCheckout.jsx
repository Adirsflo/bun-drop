import React, { useEffect, useState } from "react";
import mcIcon from "@images/payment/master-card-icon.webp";
import swishLogo from "@images/payment/swish-logo.png";
import AddressModal from "../modals/AdressModal";
import TimeModal from "../modals/TimeModal";
import LoginModal from "../modals/LoginModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHelicopterSymbol,
  faChevronLeft,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  faClock,
  faCalendarDays,
  faUser,
} from "@fortawesome/free-regular-svg-icons";

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
      <button onClick={handleNextClick}>Next</button>
      <div className="checkout-section">
        <h2>Select delivery address and time</h2>
        <div
          className="checkout-row"
          onClick={handleAddressClick}
          style={{ cursor: "pointer" }}
        >
          <div className="checkout-column">
            <FontAwesomeIcon
              icon={faHelicopterSymbol}
              className="checkout-icon"
            />
            <div>
              <h4>Delivery address</h4>
              <h3>{deliveryAddress?.address || "No address selected"}</h3>
              <h3>
                {deliveryAddress?.city || ""} {deliveryAddress?.zip || ""}
              </h3>
              {showWarning && (
                <div className="warning">Please fill in all address fields</div>
              )}
            </div>
          </div>
          <FontAwesomeIcon icon={faChevronLeft} className="faV-right" />
        </div>
        <div
          className="checkout-row"
          onClick={handleTimeClick}
          style={{ cursor: "pointer" }}
        >
          <div className="checkout-column">
            <FontAwesomeIcon icon={faClock} className="checkout-icon" />
            <div>
              <h4>Ready time</h4>
              <button>
                <FontAwesomeIcon icon={faCalendarDays} />
                <p>{deliveryTime}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="checkout-section">
        <h2>Pay with</h2>
        <div
          className="payment-option"
          onClick={() => handlePaymentSelect("credit")}
          style={{ cursor: "pointer" }}
        >
          <div className="checkout-column">
            <img src={mcIcon} alt="Mastercard" className="payment-icon" />
            <h3>Credit/debit card</h3>
          </div>
          {currentPayment === "credit" && (
            <FontAwesomeIcon icon={faCheck} className="payment-check" />
          )}
        </div>
        <div
          className="payment-option"
          onClick={() => handlePaymentSelect("swish")}
          style={{ cursor: "pointer" }}
        >
          <div className="checkout-column">
            <img src={swishLogo} alt="Swish" className="payment-icon" />
            <h3>Swish</h3>
          </div>
          {currentPayment === "swish" && (
            <FontAwesomeIcon icon={faCheck} className="payment-check" />
          )}
        </div>
      </div>
      <div className="checkout-section">
        {user ? (
          <div>
            <h2>Welcome, {user?.firstName || "Guest"}!</h2>
            <button onClick={() => logout()}>LOG OUT</button>
          </div>
        ) : (
          <>
            <h2>Or log in</h2>
            <div
              className="login-option"
              onClick={openModal}
              style={{ cursor: "pointer" }}
            >
              <div className="checkout-column">
                <FontAwesomeIcon icon={faUser} className="checkout-icon" />
                <h3>Log in / register</h3>
              </div>
              <FontAwesomeIcon icon={faChevronLeft} className="faV-right" />
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
