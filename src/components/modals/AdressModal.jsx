import React, { useState } from "react";

function AddressModal({ onClose, onSave }) {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const handleSave = () => {
    if (!address || !city || !zip) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
      onSave({ address, city, zip });
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Enter Delivery Address</h2>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Zip"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        {showWarning && (
          <div className="warning">Please fill in all fields</div>
        )}
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default AddressModal;
