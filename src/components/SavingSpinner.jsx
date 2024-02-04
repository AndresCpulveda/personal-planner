import React from "react";

import "../styles/SavingSpinner.css";

function SavingSpinner({ active, text, additionalStyles }) {
  return (
    <div
      className={`flex gap-4 ${active ? "visible" : "invisible"} ${additionalStyles ? additionalStyles : ""}`}
    >
      <p className="text-slate-500">{text}</p>
      <div className="sk-circle">
        <div className="sk-circle1 sk-chil"></div>
        <div className="sk-circle2 sk-child"></div>
        <div className="sk-circle3 sk-child"></div>
        <div className="sk-circle4 sk-child"></div>
        <div className="sk-circle5 sk-child"></div>
        <div className="sk-circle6 sk-child"></div>
        <div className="sk-circle7 sk-child"></div>
        <div className="sk-circle8 sk-child"></div>
        <div className="sk-circle9 sk-child"></div>
        <div className="sk-circle10 sk-child"></div>
        <div className="sk-circle11 sk-child"></div>
        <div className="sk-circle12 sk-child"></div>
      </div>
    </div>
  );
}

export default SavingSpinner;
