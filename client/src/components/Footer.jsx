import img from "../assets/img/img.js";
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <>
      <footer>
        <picture>
          <img src={img.logo} alt="logo Le Stage" />
        </picture>
        <div className="footer-text">
          <nav>
            <Link to="">Contact</Link>
            <Link to="">About us</Link>
            <Link to="">Terms and conditions</Link>
          </nav>
          <div className="copy">
            <p>Copyright ©Le Stage SA - 2023. All rights reserved</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
