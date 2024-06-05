import React, { useState, useEffect } from "react";
import Receipt from "../../components/Receipt";
import { useAuth } from "../../hooks/AuthContext";
import "./Receipts.css";

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
            const receiptsToDisplay = [];

            data.forEach((receipt) => {
              if (
                loggedInUser.receipts.some(
                  (userReceipt) => userReceipt.id === receipt.id
                )
              ) {
                receiptsToDisplay.push(receipt);
              }
            });

            setUserReceipts(receiptsToDisplay);
          } else {
            console.log("NULL");
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
      <div>
        <h1>MY ORDERS</h1>
        {userReceipts.map((r) => (
          <div key={r.id} onClick={() => handleReceiptDisplay(r)}>
            <div>Receipt.no: {r.id}</div>
            <div>
              {r.orderDate} | {r.orderTime}
            </div>
          </div>
        ))}
      </div>
      <div>
        {displayReceipt ? (
          <Receipt receipt={displayReceipt} />
        ) : (
          "Select receipt to review"
        )}
      </div>
    </>
  );
}

export default Receipts;
