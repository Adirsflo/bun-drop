import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import brLabel from "@images/bun_drop/br-label.png";
import locationImg from "@images/display/location.png";
import { Link } from "react-router-dom";

function Confirmation() {
  const { receiptId } = useParams();
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/receipts/${receiptId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch receipt");
        }
        const data = await response.json();
        setReceipt(data);
      } catch (error) {
        console.error("Error fetching receipt:", error);
      }
    };

    fetchReceipt();
  }, [receiptId]);

  if (!receipt) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <div>
          <p>Receipt.no: {receipt.id}</p>
          <div>
            <h3>
              Thank you {receipt.contact["first-name"]}{" "}
              {receipt.contact["last-name"]} for your order
            </h3>
            <img src={brLabel} alt="" />
            <h5>We've sent you a receipt to your email</h5>
          </div>
          <div>
            <h3>Order Details</h3>
          </div>
          <div>
            <div>
              {receipt.order.map((item, index) => (
                <div key={index}>
                  <h3>
                    {item.quantity}x - {item.title}
                  </h3>
                </div>
              ))}
              <div />
              <div>
                <h2>Total amount</h2>
                <h2>SEK {receipt["total-amount"]}</h2>
              </div>
              <div>
                <h2>VAT: 25%</h2>
                <h2>SEK {receipt.vat}</h2>
              </div>
            </div>
            <div>
              <div>
                <h4>Contact info</h4>
                <h5>
                  {receipt.contact["first-name"]} {receipt.contact["last-name"]}
                </h5>
                <h5>{receipt.contact.phone}</h5>
                <h5>{receipt.contact.email}</h5>
              </div>
              <div>
                <img src={locationImg} alt="" />
                <div>
                  <div>
                    <h1>Arriving by</h1>
                    <h2>13:40 -13:50</h2>
                  </div>
                  <div>
                    <h1>Deliver to</h1>
                    <h2>{receipt.contact.address}</h2>
                    <h2>
                      {receipt.contact.city}, {receipt.contact.zip}
                    </h2>
                  </div>
                </div>
                <h1>Food's ready!!</h1>
                <h1>Packing your order to the drone!</h1>
              </div>
            </div>
          </div>
        </div>
        <button>
          <Link to="/order">Place another Drop!</Link>
        </button>
      </div>
    </>
  );
}

export default Confirmation;
