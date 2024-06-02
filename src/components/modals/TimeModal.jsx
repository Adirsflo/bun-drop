import React, { useEffect, useState } from "react";

function TimeModal({ initialTime, onClose, onSave }) {
  const [selectedTime, setSelectedTime] = useState(
    "As soon as possible (ca 20 min)"
  );

  useEffect(() => {
    setSelectedTime(initialTime);
  }, [initialTime]);

  const handleSave = () => {
    onSave(selectedTime);
    onClose();
  };

  const times = [
    "As soon as possible (ca 20 min)",
    "In 30 minutes",
    "In 1 hour",
    "At a specific time",
  ];

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Select Delivery Time</h2>
        {times.map((time) => (
          <div key={time}>
            <input
              type="radio"
              id={time}
              name="deliveryTime"
              value={time}
              checked={selectedTime === time}
              onChange={() => setSelectedTime(time)}
            />
            <label htmlFor={time}>{time}</label>
          </div>
        ))}
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default TimeModal;
