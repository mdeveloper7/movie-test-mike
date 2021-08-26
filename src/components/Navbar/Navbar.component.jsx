import React from "react";
import "./Navbar.css";

const Navbar = ({ title }) => {
  return (
    <div className="header">
      <h2>{title}</h2>
    </div>
  );
};

export default Navbar;
