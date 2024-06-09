import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faLock } from "@fortawesome/free-solid-svg-icons";
import { faCcVisa, faCcMastercard } from "@fortawesome/free-brands-svg-icons";
import { generateOrderId } from "../../utils/utils";
import { useAuth } from "../../hooks/AuthContext";

function OrderCard({ orderDetails }) {
  const { cart = [], deliveryAddress, userDetails } = orderDetails;
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [errors, setErrors] = useState({});
  const [receiptId, setReceiptId] = useState("");
  const navigate = useNavigate();
  const { user, loginWithUserData } = useAuth();

  useEffect(() => {
    const generatedReceiptId = generateUniqueOrderId();
    setReceiptId(generatedReceiptId);
  }, []);

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 16) {
      const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
      setCardNumber(formattedValue);
    }
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      let formattedValue = value;
      if (value.length >= 2) {
        formattedValue = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
      }
      setExpiryDate(formattedValue);
    }
  };

  const handleSecurityCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setSecurityCode(value);
    }
  };

  const isUniqueOrderId = (orderId) => {
    const receipts = JSON.parse(localStorage.getItem("receipts")) || [];
    return !receipts.some((receipt) => receipt.id === orderId);
  };

  const generateUniqueOrderId = () => {
    let orderId;
    do {
      orderId = generateOrderId();
    } while (!isUniqueOrderId(orderId));
    return orderId;
  };

  const handlePayClick = async () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear() % 100;

    if (cardNumber.replace(/\s/g, "").length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    const [month, year] = expiryDate
      .split("/")
      .map((part) => parseInt(part, 10));
    if (!expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      newErrors.expiryDate = "Expiry date must be in MM/YY format";
    } else if (year < currentYear) {
      newErrors.expiryDate = "Expiry year must be current year or later";
    }

    if (!securityCode.match(/^\d{3}$/)) {
      newErrors.securityCode = "Security code must be 3 digits";
    }

    if (Object.keys(newErrors).length === 0) {
      const totalAmount = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const now = new Date();
      const orderDate = now.toISOString().split("T")[0];
      const orderTime = now.toTimeString().split(" ")[0];

      const receipt = {
        id: receiptId,
        order: cart,
        "total-amount": totalAmount.toFixed(2),
        vat: (totalAmount * 0.25).toFixed(2),
        contact: {
          ...userDetails,
          address: deliveryAddress.address,
          city: deliveryAddress.city,
          zip: deliveryAddress.zip,
        },
        orderDate,
        orderTime,
      };

      try {
        // Save receipt in receipts database
        const receiptResponse = await fetch("http://localhost:3001/receipts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(receipt),
        });

        if (!receiptResponse.ok) {
          throw new Error("Failed to save receipt");
        }

        // Update user in users database
        if (user) {
          const updatedUser = {
            ...user,
            receipts: [...user.receipts, { id: receiptId }],
          };

          const userResponse = await fetch(
            `http://localhost:3001/users/${user.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedUser),
            }
          );

          if (!userResponse.ok) {
            throw new Error("Failed to update user receipts");
          }

          loginWithUserData(updatedUser);
        }

        navigate(`/confirmation/${receiptId}`);
      } catch (error) {
        console.error("Error saving receipt:", error);
        setErrors({
          general:
            "There was an error processing your payment. Please try again.",
        });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="card-section-container">
      <div className="card-section-top">
        <div className="card-section-top-txt">
          <FontAwesomeIcon icon={faCreditCard} className="credit-icon" />
          <h1>Cards</h1>
        </div>
        <div className="card-section-top-icons">
          <FontAwesomeIcon icon={faCcVisa} className="payment-icon" />
          <FontAwesomeIcon icon={faCcMastercard} className="payment-icon" />
        </div>
      </div>
      <div className="card-section-card-container">
        <div className="card-section-card">
          <h1>Card number</h1>
          <input
            className="card-section-card-input"
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={handleCardNumberChange}
          />
          {errors.cardNumber && (
            <div className="error">{errors.cardNumber}</div>
          )}
        </div>
        <div className="card-section-exp-cvc">
          <div className="card-section-exp">
            <h1>Expiry date</h1>
            <input
              className="card-section-exp-cvc-input"
              type="text"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={handleExpiryDateChange}
            />
            {errors.expiryDate && (
              <div className="error">{errors.expiryDate}</div>
            )}
          </div>
          <div className="card-section-cvc">
            <h1>Security code</h1>
            <input
              className="card-section-exp-cvc-input"
              type="text"
              placeholder="3 digits"
              value={securityCode}
              onChange={handleSecurityCodeChange}
            />
            {errors.securityCode && (
              <div className="error">{errors.securityCode}</div>
            )}
          </div>
        </div>
      </div>
      <button className="card-pay-btn" onClick={handlePayClick}>
        <FontAwesomeIcon icon={faLock} />
        <span> Pay</span>
      </button>
      {errors.general && <div className="error">{errors.general}</div>}
    </div>
  );
}

export default OrderCard;
