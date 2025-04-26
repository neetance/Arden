import { useState } from 'react';
import './button2.css';

function BecomeValidator() {
  const [formData, setFormData] = useState({
    fullName: '',
    walletAddress: '',
    experienceYears: '',
    motivation: '',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Validator Application:', formData);
    alert('Application Submitted Successfully!');
  };

  return (
    <div className="validator-container">
      <h2 className="validator-heading">Become a Validator</h2>
      <form onSubmit={handleSubmit} className="validator-form">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="validator-input"
        />
        <input
          type="text"
          name="walletAddress"
          placeholder="Wallet Address"
          value={formData.walletAddress}
          onChange={handleChange}
          required
          className="validator-input"
        />
        <input
          type="number"
          name="experienceYears"
          placeholder="Years of Experience"
          value={formData.experienceYears}
          onChange={handleChange}
          required
          className="validator-input"
        />
        <textarea
          name="motivation"
          placeholder="Why do you want to become a validator?"
          value={formData.motivation}
          onChange={handleChange}
          required
          className="validator-textarea"
          rows="4"
        />
        <button type="submit" className="validator-button">
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default BecomeValidator;
