import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoginModal from "./modals/LoginModal";
import brIcon from "@images/bun_drop/br-icon.png";
import brLabel from "@images/bun_drop/br-label.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faUserPen,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/AuthContext";

function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [showDeskNav, setShowDeskNav] = useState(true);
  const [isRegister, setIsRegister] = useState(true);
  const { user, login, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setShowDeskNav(false);
      } else {
        setShowDeskNav(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Kontrollera bredden vid första renderingen

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openModal = (isRegistering) => {
    setIsRegister(isRegistering);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {!showDeskNav && (
        <div className="mobile-nav">
          <button
            className={`hamburger ${menuOpen ? "is-active" : ""}`}
            onClick={toggleMenu}
          >
            <div className="bar"></div>
          </button>
          <Link className="brIcon-mobile" to="/">
            <img className="brIcon-m" src={brIcon} alt="BUN DROP" />
          </Link>
        </div>
      )}
      <div id="nav-wrapper">
        {showDeskNav ? (
          <>
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
                {user ? (
                  <div id="nav-login">
                    <Link to="/receipts">
                      <FontAwesomeIcon className="nav-icon" icon={faReceipt} />
                    </Link>
                    <Link to="/account">
                      <FontAwesomeIcon className="nav-icon" icon={faUserPen} />
                    </Link>
                    <Link to="favorites">
                      <FontAwesomeIcon className="nav-icon" icon={faHeart} />
                    </Link>
                    <button className="btn-dark" onClick={logout}>
                      LOG OUT
                    </button>
                  </div>
                ) : (
                  <div id="nav-login">
                    <button
                      className="btn-dark"
                      onClick={() => openModal(true)}
                    >
                      REGISTER
                    </button>
                    <button
                      className="btn-dark"
                      onClick={() => openModal(false)}
                    >
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
          </>
        ) : (
          ""
        )}
      </div>

      {menuOpen && !showDeskNav && (
        <div className={`menu ${menuOpen ? "open" : ""}`}>
          <Link to="/">
            <img className="brLabel" src={brLabel} alt="BUN DROP" />
          </Link>
          <div id="nav-mobile-content">
            <Link className="font-jellee nav-size" to="/menu">
              MENU
            </Link>
            <Link className="font-jellee nav-size" to="/order">
              ORDER
            </Link>
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
          {user ? (
            <>
              <div id="label-container">
                <Link to="/receipts">
                  <FontAwesomeIcon className="nav-icon" icon={faReceipt} />
                </Link>
                <Link to="/account">
                  <FontAwesomeIcon className="nav-icon" icon={faUserPen} />
                </Link>
                <Link to="favorites">
                  <FontAwesomeIcon className="nav-icon" icon={faHeart} />
                </Link>
              </div>
              <h3>WELCOME!</h3>
              <button className="btn-dark" onClick={logout}>
                LOG OUT
              </button>
            </>
          ) : (
            <>
              <div id="label-container"></div>
              <div id="#nav-login-mobile">
                <button className="btn-dark" onClick={() => openModal(true)}>
                  REGISTER
                </button>
                <button className="btn-dark" onClick={() => openModal(false)}>
                  LOGIN
                </button>
              </div>
            </>
          )}
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

export default Navbar;

// import React, { useState } from "react";

// // Router
// import { Link } from "react-router-dom";

// // Modal component
// import LoginModal from "./modals/LoginModal";

// // Images & Font Awesome Icons
// import brIcon from "@images/bun_drop/br-icon.png";
// import brLabel from "@images/bun_drop/br-label.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faHeart,
//   faUserPen,
//   faReceipt,
// } from "@fortawesome/free-solid-svg-icons";

// // Authorization hook
// import { useAuth } from "../hooks/AuthContext";

// function Navbar() {
//   const [showModal, setShowModal] = useState(false);
//   const [showDeskNav, setShowDeskNav] = useState(true);
//   const [isRegister, setIsRegister] = useState(true);
//   const { user, login, logout } = useAuth();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const openModal = (isRegistering) => {
//     setIsRegister(isRegistering);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   return (
//     <>
//       {showDeskNav ? (
//         <div id="nav-wrapper">
//           <div id="nav-left">
//             <div id="label-container">
//               <Link to="/">
//                 <img className="brLabel" src={brLabel} alt="BUN DROP" />
//               </Link>
//             </div>
//             <div id="nav-left-bottom">
//               <Link className="font-jellee nav-size" to="/menu">
//                 MENU
//               </Link>
//               <Link className="font-jellee nav-size" to="/order">
//                 ORDER
//               </Link>
//             </div>
//           </div>
//           <Link to="/">
//             <img className="brIcon" src={brIcon} alt="BUN DROP" />
//           </Link>
//           <div id="nav-right">
//             <div id="nav-container-btn">
//               {user ? (
//                 <div id="nav-login">
//                   <Link to="/receipts">
//                     <FontAwesomeIcon className="nav-icon" icon={faReceipt} />
//                   </Link>
//                   <Link to="/account">
//                     <FontAwesomeIcon className="nav-icon" icon={faUserPen} />
//                   </Link>
//                   <Link to="favorites">
//                     <FontAwesomeIcon className="nav-icon" icon={faHeart} />
//                   </Link>
//                   <button className="btn-dark" onClick={logout}>
//                     LOG OUT
//                   </button>
//                 </div>
//               ) : (
//                 <div id="nav-login">
//                   <button className="btn-dark" onClick={() => openModal(true)}>
//                     REGISTER
//                   </button>
//                   <button className="btn-dark" onClick={() => openModal(false)}>
//                     LOGIN
//                   </button>
//                 </div>
//               )}
//             </div>
//             <div id="nav-right-bottom">
//               <a className="font-jellee nav-size" href="*">
//                 ABOUT US
//               </a>
//               <a className="font-jellee nav-size" href="*">
//                 FAQ
//               </a>
//               <a className="font-jellee nav-size" href="*">
//                 CAREER
//               </a>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <button
//             className={`hamburger ${menuOpen ? "is-active" : ""}`}
//             onClick={toggleMenu}
//           >
//             <div className="b-bar"></div>
//           </button>
//         </div>
//       )}

//       {showModal && (
//         <LoginModal
//           isRegister={isRegister}
//           setIsRegister={setIsRegister}
//           closeModal={closeModal}
//           onLogin={login}
//         />
//       )}
//     </>
//   );
// }

// export default Navbar;
