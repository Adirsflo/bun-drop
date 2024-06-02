import React from "react";

function SugestedDip({ onContinue }) {
  return (
    <div>
      <button onClick={onContinue}>Continue</button>
      <h2>Sugested Dip</h2>
      <p>Please choose a dip to go with your burger.</p>
    </div>
  );
}

export default SugestedDip;
