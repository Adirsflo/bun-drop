import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Receipt from "../components/Receipt.jsx";

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
        <Receipt receipt={receipt} />
        {/* Passing receipt as a prop */}
        <button>
          <Link to="/order">Place another Drop!</Link>
        </button>
      </div>
    </>
  );
}

export default Confirmation;
