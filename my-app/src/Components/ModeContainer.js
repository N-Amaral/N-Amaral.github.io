import React from "react";
import { DarkMode } from "./DarkMode";
import { Language } from "./Language";

export const ModeContainer = (props) => {
  return (
    <div className="container-modes">
      <Language language={props.lang} langHandler={props.langHandler} />
      <DarkMode switchMode={props.switchMode} />
    </div>
  );
};
