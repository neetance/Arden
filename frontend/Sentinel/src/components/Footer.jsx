import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Sentinel</h4>
          <p>Decentralized insurance protocol protecting DeFi investments</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#insurance">Insurance</a>
            </li>
            <li>
              <a href="#claims">Claims</a>
            </li>
            <li>
              <a href="#stake">Stake</a>
            </li>
            <li>
              <a href="#dao">DAO</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li>
              <a href="#docs">Documentation</a>
            </li>
            <li>
              <a href="#whitepaper">Whitepaper</a>
            </li>
            <li>
              <a href="#github">GitHub</a>
            </li>
            <li>
              <a href="#audit">Audit Reports</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Community</h4>
          <div className="social-links">
            <a href="#twitter">Twitter</a>
            <a href="#discord">Discord</a>
            <a href="#telegram">Telegram</a>
            <a href="#medium">Medium</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 ARDEN Protocol. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
