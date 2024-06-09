import React, { useState, useEffect } from "react";

// Component
import Receipt from "../../components/Receipt";

// Hook
import { useAuth } from "../../hooks/AuthContext";

// CSS files
import "./Receipts.css";
import "../Confirmation/Confirmation.css";

function Receipts() {
  const [userReceipts, setUserReceipts] = useState([]);
  const [displayReceipt, setDisplayReceipt] = useState(null);
  const { getLoggedInUser, user } = useAuth();

  useEffect(() => {
    if (user) {
      fetch("http://localhost:3001/receipts")
        .then((res) => res.json())
        .then((data) => {
          const loggedInUser = getLoggedInUser();

          if (loggedInUser) {
            const receiptsToDisplay = data.filter((receipt) =>
              loggedInUser.receipts.some(
                (userReceipt) => userReceipt.id === receipt.id
              )
            );

            receiptsToDisplay.sort((a, b) => {
              const dateA = new Date(`${a.orderDate}T${a.orderTime}`);
              const dateB = new Date(`${b.orderDate}T${b.orderTime}`);
              return dateA - dateB;
            });

            setUserReceipts(receiptsToDisplay);
          }
        });
    }
  }, [getLoggedInUser, user]);

  const handleReceiptDisplay = (receipt) => {
    setDisplayReceipt(receipt);
  };

  if (!user) {
    return <h1>PLEASE LOG IN TO VIEW RECEIPTS</h1>;
  }

  return (
    <>
      <div className="receipts-container">
        <div className="receipts-container-left">
          <h1>MY ORDERS</h1>
          <div className="receipts-orders">
            {[...userReceipts].reverse().map((r, index) => (
              <div
                className={`receipts-order ${
                  displayReceipt && displayReceipt.id === r.id
                    ? "selected"
                    : index % 2 === 0
                    ? "even"
                    : "odd"
                }`}
                key={r.id}
                onClick={() => handleReceiptDisplay(r)}
              >
                <div>Receipt.no: {r.id}</div>
                <div>
                  {r.orderDate} | {r.orderTime}
                </div>
              </div>
            ))}
            <div className="dummy-spacing" />
          </div>
        </div>
        <div className="receipts-container-right">
          {displayReceipt ? (
            <Receipt receipt={displayReceipt} />
          ) : (
            "Select receipt to review"
          )}
        </div>
      </div>
    </>
  );
}

export default Receipts;
