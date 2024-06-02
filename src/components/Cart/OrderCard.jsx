import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faLock } from "@fortawesome/free-solid-svg-icons";
import { faCcVisa, faCcMastercard } from "@fortawesome/free-brands-svg-icons";
import { generateOrderId } from "../../utils/utils";

function OrderCard({ orderDetails }) {
  const { cart = [], deliveryAddress, userDetails } = orderDetails;
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [errors, setErrors] = useState({});
  const [receiptId, setReceiptId] = useState("");
  const navigate = useNavigate();

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

    if (cardNumber.replace(/\s/g, "").length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }
    const [month] = expiryDate.split("/");
    if (!expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      newErrors.expiryDate = "Expiry date must be in MM/YY format";
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
        const response = await fetch("http://localhost:3001/receipts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(receipt),
        });

        if (!response.ok) {
          throw new Error("Failed to save receipt");
        }

        navigate(`/confirmation/${receiptId}`);
      } catch (error) {
        console.error("Error saving receipt:", error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div>
      <div>
        <div>
          <FontAwesomeIcon icon={faCreditCard} />
          <h1>Cards</h1>
        </div>
        <div>
          <FontAwesomeIcon icon={faCcVisa} />
          <FontAwesomeIcon icon={faCcMastercard} />
        </div>
      </div>
      <div>
        <h1>Card number</h1>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChange={handleCardNumberChange}
        />
        {errors.cardNumber && <div className="error">{errors.cardNumber}</div>}
      </div>
      <div>
        <div>
          <h1>Expiry date</h1>
          <input
            type="text"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={handleExpiryDateChange}
          />
          {errors.expiryDate && (
            <div className="error">{errors.expiryDate}</div>
          )}
        </div>
        <div>
          <h1>Security code</h1>
          <input
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
      <button onClick={handlePayClick}>
        <FontAwesomeIcon icon={faLock} />
        <span> Pay</span>
      </button>
    </div>
  );
}

export default OrderCard;
