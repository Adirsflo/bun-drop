import React, { useState, useEffect } from "react";

// Images
import brLabel from "@images/bun_drop/br-label.png";
import locationImg from "@images/display/location.png";

// Hook
import { useTimer } from "../hooks/Timer";

function Receipt({ receipt }) {
  const [arrivalTime, setArrivalTime] = useState(null);

  useEffect(() => {
    if (receipt) {
      const orderDateTime = new Date(
        `${receipt.orderDate}T${receipt.orderTime}`
      );
      const deliveryStartTime = new Date(
        orderDateTime.getTime() + 25 * 60 * 1000
      );
      setArrivalTime(deliveryStartTime);
    }
  }, [receipt]);

  const timeLeft = useTimer(arrivalTime);

  if (!receipt) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="confirmation-container">
        <p id="receiptId">Receipt.no: {receipt.id}</p>
        <div className="confirmation-top">
          <h3>
            Thank you {receipt.contact.firstName} {receipt.contact.lastName} for
            your
          </h3>
          <img src={brLabel} alt="" />
          <h5>We've sent you a receipt to your email</h5>
        </div>

        <div className="order-details-header-container">
          <h3 className="order-details-header">Order Details</h3>
        </div>
        <div className="confirmation-bottom">
          <div className="confirmation-bottom-left">
            <div className="confirmation-order-details-top">
              {receipt.order.map((item, index) => (
                <div className="confirmation-order-detail" key={index}>
                  <h3>
                    {item.quantity}x - {item.title}
                  </h3>
                  <h4>{item.price * item.quantity}:-</h4>
                </div>
              ))}
            </div>
            <div className="dummy-confirmation-bar" />
            <div className="confirmation-order-details-bottom">
              <div className="confirmation-total-container">
                <h2>Total amount</h2>
                <h2>SEK {receipt["total-amount"]}</h2>
              </div>
              <div className="confirmation-vat-container">
                <h2>VAT: 25%</h2>
                <h2>SEK {receipt.vat}</h2>
              </div>
            </div>
          </div>

          <div className="dummy-seperation" />

          <div className="confirmation-bottom-right">
            <div className="confirmation-contacts">
              <h4>Contact info</h4>
              <h5>
                {receipt.contact.firstName} {receipt.contact.lastName}
              </h5>
              <h5>{receipt.contact.phone}</h5>
              <h5>{receipt.contact.email}</h5>
            </div>
            <div className="confirmation-drop-location-container">
              <img src={locationImg} alt="" />
              <div className="confirmation-drop-top">
                <div>
                  <h1>Arriving by</h1>
                  {arrivalTime && (
                    <h2>
                      {arrivalTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </h2>
                  )}
                  {timeLeft ? (
                    <h1>
                      Time left: {timeLeft.minutes}m {timeLeft.seconds}s
                    </h1>
                  ) : (
                    <h1>Food has been delivered!</h1>
                  )}
                </div>
                <div>
                  <h1>Deliver to</h1>
                  <h2>{receipt.contact.address}</h2>
                  <h2>
                    {receipt.contact.city}, {receipt.contact.zip}
                  </h2>
                </div>
              </div>
              <div className="dummy-dashed" />
              <div className="confirmation-status-container">
                <h1>Food's ready!!</h1>
                <h1>Packing your order to the drone!</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Receipt;
