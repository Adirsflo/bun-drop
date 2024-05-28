import React from "react";
import { Link } from "react-router-dom";
import brLabel from "../images/bun_drop/br-label.png";
import swishIcon from "../images/payment/swish-icon.png";
import mcIcon from "../images/payment/mastercard-logo.png";
import visaLogo from "../images/payment/visa-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareGithub,
  faLinkedin,
  faSquareTwitter,
  faSquareFacebook,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <>
      <div id="footer-wrapper">
        <div className="footer-top">
          <div className="footer-socials-section">
            <Link to="/">
              <img className="brLabelFooter" src={brLabel} alt="BUN DROP" />
            </Link>
            <ul className="social-icons">
              <li>
                <a href="https://github.com/Adirsflo" target="_blank">
                  <FontAwesomeIcon
                    className="social-link"
                    icon={faSquareGithub}
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/rida-abdal/"
                  target="_blank"
                >
                  <FontAwesomeIcon className="social-link" icon={faLinkedin} />
                </a>
              </li>
              <li>
                <a href="https://developer.x.com/en/404" target="_blank">
                  <FontAwesomeIcon
                    className="social-link"
                    icon={faSquareTwitter}
                  />
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/adir.abdal" target="_blank">
                  <FontAwesomeIcon
                    className="social-link"
                    icon={faSquareFacebook}
                  />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/adirabdal" target="_blank">
                  <FontAwesomeIcon
                    className="social-link"
                    icon={faSquareInstagram}
                  />
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-menu">
            <Link className="link" to="/menu">
              MENU
            </Link>
            <Link className="link" to="/order">
              ORDER
            </Link>
            <Link className="link" to="*">
              ABOUT US
            </Link>
            <Link className="link" to="*">
              FAQ
            </Link>
            <Link className="link" to="*">
              CAREER
            </Link>
          </div>
          <div className="opening-hours">
            <p className="rowdies-regular">OPENING HOURS</p>
            <p className="rowdies-light">Mon - Thur: 10 - 23</p>
            <p className="rowdies-light">Fri - Sun: 10 - 02</p>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="bottom-section">
            &copy; <img className="brLabel" src={brLabel} alt="BUN DROP" />{" "}
            2024. All rights reserved.
          </div>
          <ul className="bottom-section payment-section">
            <li>
              <img src={swishIcon} alt="Swish" />
            </li>
            <li>
              <img src={mcIcon} alt="Mastercard" />
            </li>
            <li>
              <img id="visa-footer" src={visaLogo} alt="Visa" />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Footer;
