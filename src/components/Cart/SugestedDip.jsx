import React from "react";

function SugestedDip({ onContinue }) {
  return (
    <div>
      <button onClick={onContinue}>Continue</button>
      <h1>Sugested Dip</h1>
      <p>Please choose a dip to go with your burger.</p>
    </div>
  );
}

export default SugestedDip;
