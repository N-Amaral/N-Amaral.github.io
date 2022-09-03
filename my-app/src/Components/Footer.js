import React from "react";

//Footer Component
export const Footer = () => {
  const currentYear = () => {
    const date = new Date();
    return date.getFullYear();
  };

  return (
    <footer className="not-visible" id="footer-end">
      &copy;
      <small>{`Nuno Amaral ${currentYear()}`}</small>
    </footer>
  );
};
