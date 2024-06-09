import React from "react";

// Components
import OrderCard from "./OrderCard";
import OrderSwish from "./OrderSwish";

function OrderPayment({ selectedPayment, orderDetails }) {
  return (
    <>
      {selectedPayment === "credit" && (
        <OrderCard orderDetails={orderDetails} />
      )}
      {selectedPayment === "swish" && (
        <OrderSwish orderDetails={orderDetails} />
      )}
    </>
  );
}

export default OrderPayment;
