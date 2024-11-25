
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Contact Information */}
        <div className="footer-section about">
          <h3>About us</h3>
          <p>Address: HBFLIX Building, No. 8 Hoang Van Thai, Quarter 1, Tan Phu Ward, Son Tra, Da Nang City</p>
          <p>Hotline: 1900 00900 876 (Fee: 1,000 VND/min)</p>
          <p>Email: support@hbflix.vn</p>
          <p>Working Hours: 8:00 AM - 10:00 PM</p>
        </div>
        
        {/* Quick Links */}
        <div className="footer-section quick-links">
          <h3>Browse</h3>
          <ul>
            <li><a href="#">Now Showing</a></li>
            <li><a href="#">Coming Soon</a></li>
            <li><a href="#">Promotions & Events</a></li>
            <li><a href="#">Customer Support</a></li>
          </ul>
        </div>
         
        {/* Policies and Terms */}
        <div className="footer-section policies">
          <h3>Help</h3>
          <ul>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Refund Policy</a></li>
            <li><a href="#">Accessibility</a></li>
            <li><a href="#">Supported devices</a></li>
            <li><a href="#">Account & Billing</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-section social-media">
          <h3>Follow Us</h3>
          <div className="social-icons">
              <a href="#" className="social-link">
                <FaFacebook className="social-icon" />
                <span>Facebook</span>
              </a>
              <a href="#" className="social-link">
                <FaInstagram className="social-icon" />
                <span>Instagram</span>
              </a>
              <a href="#" className="social-link">
                <FaTwitter className="social-icon" />
                <span>Twitter</span>
              </a>
              <a href="#" className="social-link">
                <FaYoutube className="social-icon" />
                <span>YouTube</span>
              </a>
            </div>
        </div>
       
      </div>
      
      {/* Copyright */}
      <div className="footer-bottom">
        <p>© 2024 HBFlix.vn. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
