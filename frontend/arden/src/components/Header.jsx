import React from "react";
import logoImg from "../assets/logo.png"; // Adjust the path
import { Link } from "react-router-dom";
import Home from "./Home";

const connectToMetamask = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected account:", accounts[0]);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  }
}

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full px-8 flex justify-between items-center z-10 h-16">
      <div className="logo flex items-center space-x-2">
        <img src={logoImg} alt="Arden Logo" className="w-16 h-16" />
        <h1 className="text-xl font-light tracking-widest text-white opacity-90">
          ARDEN
        </h1>
      </div>
      <Home/>

      <button className="text-white opacity-80 hover:opacity-100 border border-white/20 px-4 py-1 rounded-full text-xs tracking-wider transition-all duration-300" onClick={connectToMetamask}>
        CONNECT
      </button>
    </header>
  );
};

export default Header;
