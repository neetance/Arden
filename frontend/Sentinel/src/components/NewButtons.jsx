import React from "react";
import { Link } from "react-router-dom";
import './NewButtons.css'; // Assuming you have a CSS file for styling
const NewButtons = () => {
  return (
    <div>
      <Link to="/button1">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm hover:scale-105 transition-transform button1">
          Register
        </button> 
      </Link>
      <Link to="/button2">
        <button className="bg-green-500 text-white px-6 py-2 rounded-full text-sm hover:scale-105 transition-transform button2">
          Become a Validator
        </button>
      </Link>

    </div>
  );
};

export default NewButtons;
