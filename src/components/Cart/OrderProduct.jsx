import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

function OrderProduct(props) {
  function formatTitle() {
    const maxLength = 16;

    if (props.product.title) {
      const title = props.product.title;
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

  return (
    <>
      <div id="order-selection-product">
        <div id="order-selection-product-wrapper">
          <img
            className="order-selection-product-img"
            src={`${props.product.image}`}
            alt=""
          />
          {/* <span className="icon-wrapper">
            <FontAwesomeIcon icon={fasHeart} className="solid-heart" />
            <FontAwesomeIcon icon={farHeart} className="regular-heart" />
          </span> */}
        </div>
        <button className="order-selection-product-btn">
          <Link className="order-product-btn" to={`/menu/${props.product.id}`}>
            <div className="osp-left">{formatTitle()}</div>
            <div className="osp-right">{props.product.price}:-</div>
          </Link>
        </button>
      </div>
    </>
  );
}

export default OrderProduct;
