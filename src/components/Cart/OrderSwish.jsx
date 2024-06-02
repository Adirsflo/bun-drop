import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swishText from "@images/payment/swish-text.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { generateOrderId } from "../../utils/utils";

function OrderSwish({ orderDetails }) {
  const { cart, deliveryAddress, userDetails } = orderDetails;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhoneNumber(value);
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

    if (!phoneNumber.startsWith("07")) {
      newErrors.phoneNumber = "Phone number must start with 07";
    }
    if (phoneNumber.length !== 10) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    if (Object.keys(newErrors).length === 0) {
      const receiptId = generateUniqueOrderId();
      const receipt = {
        id: receiptId,
        order: cart,
        "total-amount": cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
        vat: cart.reduce(
          (total, item) => total + item.price * item.quantity * 0.25,
          0
        ),
        contact: {
          ...userDetails,
          address: deliveryAddress.address,
          city: deliveryAddress.city,
          zip: deliveryAddress.zip,
        },
      };

      try {
        const response = await fetch("http://localhost:3001/receipt", {
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
        <h1>Phone number</h1>
        <input
          type="text"
          placeholder="076 XXX XX XX"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        {errors.phoneNumber && (
          <div className="error">{errors.phoneNumber}</div>
        )}
        <button onClick={handlePayClick}>
          <FontAwesomeIcon icon={faLock} />
          <span> Pay</span>
        </button>
      </div>
      <div>
        <h2>Status:</h2>
        <p>Please enter your phone number!</p>
      </div>
      <img src={swishText} alt="Swish" />
      <div>
        <p>Ordernumber: QQ5S02037</p>
        <p>Total amount: 114,00 kr</p>
      </div>
    </div>
  );
}

export default OrderSwish;
