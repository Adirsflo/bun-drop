import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Product() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const { productId } = useParams();

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:3001/menu/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data === null) {
          throw error;
        }

        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setProduct(null);
        setLoading(false);
      });
  }, [productId]);

  function formatTitle() {
    const maxLength = 100;

    if (product.title) {
      const title = product.title;
      const words = title.split(" ");

      if (words.length === 1) {
        return title;
      } else if (words.length === 2) {
        return (
          <React.Fragment>
            {words[0]} <br /> {words[1]}
          </React.Fragment>
        );
      } else if (words.length === 3) {
        return (
          <React.Fragment>
            {words[0]} {words[1]} <br /> {words[2]}
          </React.Fragment>
        );
      } else if (words.length === 4) {
        return (
          <React.Fragment>
            {words[0]} {words[1]} <br /> {words[2]} {words[3]}
          </React.Fragment>
        );
      } else {
        let formattedTitle = [];
        let currentLine = "";

        for (const part of words) {
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
      {loading ? (
        <h1>LOADING...</h1>
      ) : product === null ? (
        <h1>NO PRODUCT FOUND</h1>
      ) : (
        <div id="product-container">
          <div className="product-border-title-container">
            <h1 className="product-border-title">{formatTitle()}</h1>
          </div>
          <h1 className="product-title">{product.title}</h1>
          <p>{product.description}</p>
        </div>
      )}
    </>
  );
}

export default Product;
