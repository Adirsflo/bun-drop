import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import brIcon from "../images/bun_drop/br-icon.png";
import brLabel from "../images/bun_drop/br-label.png";
import LoginModal from "./modals/LoginModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faUserPen,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";

function Navbar({ loggedInUser, onLogin, onLogout }) {
  const [showModal, setShowModal] = useState(false);
  const [isRegister, setIsRegister] = useState(true);

  const openModal = (isRegistering) => {
    setIsRegister(isRegistering);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      onLogin(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <div id="nav-wrapper">
        <div id="nav-left">
          <div id="label-container">
            <Link to="/">
              <img className="brLabel" src={brLabel} alt="BUN DROP" />
            </Link>
          </div>
          <div id="nav-left-bottom">
            <Link className="font-jellee nav-size" to="/menu">
              MENU
            </Link>
            <Link className="font-jellee nav-size" to="/order">
              ORDER
            </Link>
          </div>
        </div>
        <Link to="/">
          <img className="brIcon" src={brIcon} alt="BUN DROP" />
        </Link>
        <div id="nav-right">
          <div id="nav-container-btn">
            {loggedInUser ? (
              <div id="nav-login">
                <Link to="/receipts">
                  <FontAwesomeIcon className="nav-icon" icon={faReceipt} />
                </Link>
                <Link to="/account">
                  <FontAwesomeIcon className="nav-icon" icon={faUserPen} />
                </Link>
                <Link to="/favorites">
                  <FontAwesomeIcon className="nav-icon" icon={faHeart} />
                </Link>
                <button className="btn-dark" onClick={onLogout}>
                  LOG OUT
                </button>
              </div>
            ) : (
              <div id="nav-login">
                <button className="btn-dark" onClick={() => openModal(true)}>
                  REGISTER
                </button>
                <button className="btn-dark" onClick={() => openModal(false)}>
                  LOGIN
                </button>
              </div>
            )}
          </div>
          <div id="nav-right-bottom">
            <a className="font-jellee nav-size" href="*">
              ABOUT US
            </a>
            <a className="font-jellee nav-size" href="*">
              FAQ
            </a>
            <a className="font-jellee nav-size" href="*">
              CAREER
            </a>
          </div>
        </div>
      </div>
      {showModal && (
        <LoginModal
          isRegister={isRegister}
          setIsRegister={setIsRegister}
          closeModal={closeModal}
          onLogin={onLogin}
        />
      )}
    </>
  );
}

export default Navbar;
