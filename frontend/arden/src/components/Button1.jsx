import { useState } from 'react';
import './button1.css';

function Register() {
  const [formData, setFormData] = useState({
    policyNumber: '',
    policyHolderName: '',
    policyType: '',
    startDate: '',
    endDate: '',
    premiumAmount: '',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Policy Details:', formData);
    alert('Policy Registered Successfully!');
  };

  return (
    <div className="register-container">
      <h2 className="register-heading">Register Your Policy</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="policyNumber"
          placeholder="Policy Number"
          value={formData.policyNumber}
          onChange={handleChange}
          required
          className="register-input"
        />
        <input
          type="text"
          name="policyHolderName"
          placeholder="Policy Holder Name"
          value={formData.policyHolderName}
          onChange={handleChange}
          required
          className="register-input"
        />
        <input
          type="text"
          name="policyType"
          placeholder="Policy Type"
          value={formData.policyType}
          onChange={handleChange}
          required
          className="register-input"
        />
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          value={formData.startDate}
          onChange={handleChange}
          required
          className="register-input"
        />
        <input
          type="date"
          name="endDate"
          placeholder="End Date"
          value={formData.endDate}
          onChange={handleChange}
          required
          className="register-input"
        />
        <input
          type="number"
          name="premiumAmount"
          placeholder="Premium Amount"
          value={formData.premiumAmount}
          onChange={handleChange}
          required
          className="register-input"
        />
        <button type="submit" className="register-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
