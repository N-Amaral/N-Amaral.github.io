import React from "react";

// Language Selection Component
export const Language = (props) => {
  return (
    <div className="container-lang loadLight">
      <span className="lang-select mode-btn " typeof="button" id="en-button" onClick={props.langHandler}>
        EN
      </span>
    </div>
  );
};
