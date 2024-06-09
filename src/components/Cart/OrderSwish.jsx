import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swishText from "@images/payment/swish-text.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { generateOrderId } from "../../utils/utils";
import { useAuth } from "../../hooks/AuthContext";

function OrderSwish({ orderDetails }) {
  const { cart, deliveryAddress, userDetails } = orderDetails;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [receiptId, setReceiptId] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();
  const { user, loginWithUserData } = useAuth();

  useEffect(() => {
    const generatedReceiptId = generateUniqueOrderId();
    setReceiptId(generatedReceiptId);
  }, []);

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
    setIsTyping(true);
    setErrors({});
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

    if (!phoneNumber.startsWith("07")) {
      newErrors.phoneNumber = "Phone number must start with 07";
    }
    if (phoneNumber.length !== 10) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    if (Object.keys(newErrors).length === 0) {
      const totalAmount = cart.reduce(
        (total, item) => total + item.price * item.quantity,
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

    setIsTyping(false);
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="swish-section-container">
      <div className="swish-section-swish">
        <div className="swish-section-top">
          <h1>Phone number</h1>
          <input
            className="swish-section-input"
            type="text"
            placeholder="076 XXX XX XX"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          <button className="swish-pay-btn" onClick={handlePayClick}>
            <FontAwesomeIcon icon={faLock} />
            <span> Pay</span>
          </button>
        </div>
        <div className="swish-section-status">
          <h2>Status:</h2>
          {!phoneNumber && !errors.general && !errors.phoneNumber && (
            <p>Please enter your phone number!</p>
          )}
          {isTyping && !errors.general && !errors.phoneNumber && (
            <div className="spinner"></div>
          )}
          {errors.general && <p className="error-swish">{errors.general}</p>}
          {errors.phoneNumber && (
            <p className="error-swish">{errors.phoneNumber}</p>
          )}
        </div>
        <img src={swishText} alt="Swish" />
        <div className="swish-section-bottom">
          <p>Ordernumber: {receiptId}</p>
          <p>Total amount: {totalAmount.toFixed(2)} kr</p>
        </div>
      </div>
    </div>
  );
}

export default OrderSwish;
