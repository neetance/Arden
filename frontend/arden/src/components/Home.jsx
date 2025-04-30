import React from "react";
import { Link } from "react-router-dom";
import './Home.css'; // Assuming you have a CSS file for styling
const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 pt-20 space-y-6">
      <Link to="/register">
        <button className="bg-white text-black px-6 py-2 rounded-full text-sm hover:scale-105 transition-transform Register">
          REGISTER
        </button>
      </Link>
      <Link to="/claim">
        <button className="bg-white text-black px-6 py-2 rounded-full text-sm hover:scale-105 transition-transform Claims">
          CLAIM
        </button>
      </Link>
      <Link to="/liquidity">
        <button className="bg-white text-black px-6 py-2 rounded-full text-sm hover:scale-105 transition-transform Claims">
          Liquidity
        </button>
      </Link>
      <Link to="/claims">
        <button className="bg-white text-black px-6 py-2 rounded-full text-sm hover:scale-105 transition-transform Claims">
          CLAIMS
        </button>
      </Link>
    </div>
  );
};

export default Home;
