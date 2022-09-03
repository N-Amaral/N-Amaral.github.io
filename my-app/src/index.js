import React from "react";
import ReactDOM from "react-dom/client";

// import stylesheets "./style.css";
import ".//Styles/app.css";
import ".//Styles/nav.css";
import ".//Styles/hero.css";
import ".//Styles/darkmode.css";
import ".//Styles/language.css";
import ".//Styles/about.css";
import ".//Styles/projects.css";
import ".//Styles/contact.css";

import ".//Styles/footer.css";

import App from "./Components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
