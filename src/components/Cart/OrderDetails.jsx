import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function OrderDetails({ userDetails, onNext, onUserDetailsChange }) {
  const [email, setEmail] = useState(userDetails?.email || "");
  const [phone, setPhone] = useState(userDetails?.phone || "");
  const [firstName, setFirstName] = useState(userDetails?.firstName || "");
  const [lastName, setLastName] = useState(userDetails?.lastName || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setEmail(userDetails?.email || "");
    setPhone(userDetails?.phone || "");
    setFirstName(userDetails?.firstName || "");
    setLastName(userDetails?.lastName || "");
  }, [userDetails]);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Only allow digits
    if (/^\d*$/.test(value)) {
      setPhone(value);
    }
  };

  const handleNextClick = () => {
    const newErrors = {};

    if (!email.includes("@")) {
      newErrors.email = "Email must contain @";
    }
    if (!phone.match(/^\d+$/)) {
      newErrors.phone = "Phone number must contain only digits";
    }
    if (!firstName.match(/^[A-Za-z]+$/)) {
      newErrors.firstName = "First name must contain only letters";
    }
    if (!lastName.match(/^[A-Za-z]+$/)) {
      newErrors.lastName = "Last name must contain only letters";
    }

    if (Object.keys(newErrors).length === 0) {
      onUserDetailsChange({ email, phone, firstName, lastName });
      onNext();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <div className="next-btn-container">
        <button onClick={handleNextClick} className="next-btn">
          Next
          <FontAwesomeIcon icon={faChevronRight} className="faV-right-next" />
        </button>
      </div>
      <div className="details-section-container">
        <h1>We need the following details</h1>
        <div className="details-section-inputs">
          <input
            className="details-section-input"
            type="text"
            placeholder="E-mail address *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="error">{errors.email}</div>}

          <input
            className="details-section-input"
            type="text"
            placeholder="Mobile phone number *"
            value={phone}
            onChange={handlePhoneChange} // Använd den nya hanteraren för telefonnummer
          />
          {errors.phone && <div className="error">{errors.phone}</div>}

          <div className="details-section-name-inputs">
            <div className="details-section-name-inputs-wrap">
              <input
                className="details-section-name-input"
                type="text"
                placeholder="First name *"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className="details-section-name-input"
                type="text"
                placeholder="Last name *"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="details-section-name-error-wrap">
              {errors.firstName && (
                <div className="error">{errors.firstName}</div>
              )}
              {errors.lastName && (
                <div className="error">{errors.lastName}</div>
              )}
            </div>
          </div>
          <p id="mandatory-txt">
            <span>*</span> Mandatory
          </p>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
