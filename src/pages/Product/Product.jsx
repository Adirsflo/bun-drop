import React, { useState, useEffect } from "react";

// Router Params
import { useParams } from "react-router-dom";

// Component
import LoginModal from "../../components/modals/LoginModal";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

// Hook
import { useAuth } from "../../hooks/AuthContext";

// CSS
import "./Product.css";

function Product() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const { productId } = useParams();
  const { user, addFavorite, removeFavorite, login } = useAuth();

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

  const isFavorite = user?.favorites.some((fav) => fav.id === productId);

  const handleFavoriteClick = () => {
    if (!user) {
      setShowModal(true);
    } else if (isFavorite) {
      removeFavorite(productId);
    } else {
      addFavorite(product);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
          <div className="product-title-container">
            <h1 className="product-title">{product.title} </h1>
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleFavoriteClick}
              className="heart-icon-container"
            >
              <FontAwesomeIcon
                icon={isFavorite ? fasHeart : farHeart}
                className={isFavorite ? "solid-heart" : "regular-heart"}
              />
              {isHovered && (
                <FontAwesomeIcon
                  icon={isFavorite ? farHeart : fasHeart}
                  className="hover-heart"
                />
              )}
            </div>
          </div>
          <p>{product.description}</p>
        </div>
      )}
      {showModal && (
        <LoginModal
          isRegister={isRegister}
          setIsRegister={setIsRegister}
          closeModal={closeModal}
          onLogin={login}
        />
      )}
    </>
  );
}

export default Product;
