import React from "react";

// Router Link
import { Link } from "react-router-dom";

function MenuProduct(props) {
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
      <div id="menu-product">
        <Link to={`/menu/${props.product.id}`}>
          <div>
            <img
              className="menu-product-img"
              src={`${props.product.image}`}
              alt=""
            />
            <span className="icon-wrapper"></span>
          </div>
          <div className="menu-product-border">{formatTitle()}</div>
        </Link>
      </div>
    </>
  );
}

export default MenuProduct;
