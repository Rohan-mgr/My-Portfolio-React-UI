import React from "react";
import "./Footer.css";
import { FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";
import { BsFacebook } from "react-icons/bs";

function Footer() {
  return (
    <footer style={{ background: "#0a192f", textAlign: "center" }}>
      <div className="footer__social__media__wrapper">
        <a href="https://github.com/Rohan-mgr" target="_blank" rel="noreferrer">
          <FiGithub />
        </a>
        <a
          href="https://www.instagram.com/rohan_magar_07/?hl=en"
          rel="noreferrer"
          target="_blank"
        >
          <FiInstagram />
        </a>
        <a
          href="https://www.facebook.com/rohan.ranamagar.12/"
          rel="noreferrer"
          target="_blank"
        >
          <BsFacebook />
        </a>
        <a
          href="https://www.linkedin.com/in/rohan-rana-magar-7931a923b/"
          rel="noreferrer"
          target="_blank"
        >
          <FiLinkedin />
        </a>
      </div>
      <p>
        Designed & Built by Rohan Rana Magar{" "}
        <span style={{ fontSize: "1.2rem", color: "#8892b0" }}>&copy;</span>{" "}
        {new Date().getFullYear()}
      </p>
    </footer>
  );
}

export default Footer;
