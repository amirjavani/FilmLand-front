import React from "react"
import './Footer.css';
import logo from "../../Assets/Header/logo.png";
import twitter from "../../Assets/twitter-brands-solid.svg";
import discord from "../../Assets/discord-brands-solid.svg";
import instagram from "../../Assets/instagram-brands-solid.svg";
import telegram from "../../Assets/telegram-brands-solid.svg";



const Footer = (props) => {
  return (
    <div className="footer">
      <div className="footer-main">
        <div className="footer-main-container">
          
          <div className="footer-social-media-container">
          <img src={twitter} alt="" />
          <img src={discord} alt="" />
          <img src={instagram} alt="" />
          <img src={telegram} alt="" />

          </div>
          <div className="footer-logo-container">
            <img src={logo} alt="" />
            
          </div>
        </div>
        <a href="/" className="footer-about">
          درباره ما
        </a>
      </div>
      <div className="footer-bottom">
        <div className="footer-copyright-container">
          <p>تمام حقوق مادی و معنوی این سایت متعلق به فیلم لند می باشد</p>
        </div>
      </div>
    </div>
  )
};

export default Footer;
