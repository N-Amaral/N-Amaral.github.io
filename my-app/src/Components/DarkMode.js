import React from "react";

// DarkMode Component
export const DarkMode = (props) => {
  return (
    <div className="container-icons">
      <div className="icons loadLight">
        <div className="light" id="light-btn">
          <span typeof="button" className="mode-btn" onClick={props.switchMode}>
            <i className="bi bi-lightbulb-off " id="icon-bulb"></i>
          </span>
        </div>
      </div>
    </div>
  );
};
