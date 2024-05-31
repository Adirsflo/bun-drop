import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

function OrderProduct({ product, onProductSelect }) {
  function formatTitle() {
    const maxLength = 16;

    if (product.title) {
      const title = product.title;
      if (title.length <= maxLength) {
        return title;
      } else {
        const parts = title.split(" ");
        let formattedTitle = [];
        let currentLine = "";

        for (const part of parts) {
          if (currentLine.length + part.length + 1 <= maxLength) {
            currentLine += (currentLine.length ? " " : "") + part;
          } else {
            formattedTitle.push(currentLine);
            currentLine = part;
          }
        }

        formattedTitle.push(currentLine);
        return formattedTitle.map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ));
      }
    }
    return "";
  }

  function handleClick() {
    onProductSelect(product);
  }

  return (
    <>
      <div id="order-selection-product">
        <div id="order-selection-product-wrapper">
          <img
            className="order-selection-product-img"
            src={`${product.image}`}
            alt=""
          />
          {/* <span className="icon-wrapper">
            <FontAwesomeIcon icon={fasHeart} className="solid-heart" />
            <FontAwesomeIcon icon={farHeart} className="regular-heart" />
          </span> */}
        </div>
        <button className="order-selection-product-btn" onClick={handleClick}>
          <div className="order-product-btn">
            <div className="osp-left">{formatTitle()}</div>
            <div className="osp-right">{product.price}:-</div>
          </div>
        </button>
      </div>
    </>
  );
}

export default OrderProduct;
