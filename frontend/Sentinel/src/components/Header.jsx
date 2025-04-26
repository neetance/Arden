import React from "react";
import logoImg from "../assets/logo.png"; // Adjust the path as per your structure

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full px-8 flex justify-between items-center z-10 h-16">
      <div className="logo flex items-center space-x-2">
        <img src={logoImg} alt="Arden Logo" className="w-16 h-16" />
        <h1 className="text-xl font-light tracking-widest text-white opacity-90">
          ARDEN
        </h1>
      </div>

      <nav className="flex items-center space-x-6">
        <a
          href="#"
          className="text-white opacity-90 border-b border-white/50 pb-px text-xs tracking-wider"
        >
          INSURANCE
        </a>
        <a
          href="#"
          className="text-white opacity-60 hover:opacity-90 transition-opacity duration-200 text-xs tracking-wider"
        >
          CLAIMS
        </a>
        <a
          href="#"
          className="text-white opacity-60 hover:opacity-90 transition-opacity duration-200 text-xs tracking-wider"
        >
          DAO
        </a>
        <a
          href="#"
          className="text-white opacity-60 hover:opacity-90 transition-opacity duration-200 text-xs tracking-wider"
        >
          STAKE
        </a>
      </nav>

      <button className="text-white opacity-80 hover:opacity-100 border border-white/20 px-4 py-1 rounded-full text-xs tracking-wider transition-all duration-300">
        CONNECT
      </button>
    </header>
  );
};

export default Header;
