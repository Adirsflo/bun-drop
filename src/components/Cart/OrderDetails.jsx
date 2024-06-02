import React, { useEffect, useState } from "react";

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
      <button onClick={handleNextClick}>Next</button>
      <div>
        <h1>We need the following details</h1>
        <div>
          <input
            type="text"
            placeholder="E-mail address *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="error">{errors.email}</div>}

          <input
            type="text"
            placeholder="Mobile phone number *"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <div className="error">{errors.phone}</div>}

          <input
            type="text"
            placeholder="First name *"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && <div className="error">{errors.firstName}</div>}

          <input
            type="text"
            placeholder="Last name *"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && <div className="error">{errors.lastName}</div>}
        </div>
        <p>
          <span>*</span> Mandatory
        </p>
      </div>
    </>
  );
}

export default OrderDetails;
