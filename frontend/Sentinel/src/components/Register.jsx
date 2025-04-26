import { useState } from 'react';
import './register.css';
function InsurancePage() {
  const [formState, setFormState] = useState({
    insuranceType: '',
    description: '',
    coverageAmount: '',
    duration: 30,
    protocol: '',
    vaultAddress: ''
  });

  const [premium, setPremium] = useState(null);
  const [showQuote, setShowQuote] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    setShowQuote(false);
  };

  const calculatePremium = () => {
    // Mock premium calculation
    const baseRate = 0.02; // 2%
    
    let riskMultiplier = 1;
    if (formState.insuranceType === 'Smart Contract Exploit') riskMultiplier = 1.2;
    if (formState.insuranceType === 'Oracle Failure') riskMultiplier = 1.5;
    if (formState.insuranceType === 'Bridge Hack') riskMultiplier = 1.8;
    
    const durationMultiplier = formState.duration / 30;
    
    const amount = parseFloat(formState.coverageAmount) || 0;
    const calculatedPremium = amount * baseRate * riskMultiplier * durationMultiplier;
    
    return calculatedPremium.toFixed(4);
  };

  const handleGetQuote = (e) => {
    e.preventDefault();
    const calculatedPremium = calculatePremium();
    setPremium(calculatedPremium);
    setShowQuote(true);
  };

  const handlePurchase = (e) => {
    e.preventDefault();
    // For frontend demo only - would connect to wallet/contract in real implementation
    alert('Purchase functionality would be implemented with Web3 integration');
  };

  return (
    <div className="insurance-page">
      <h1>Buy Insurance</h1>
      
      <div className="insurance-form-container">
        <form className="insurance-form" onSubmit={handleGetQuote}>
          <div className="form-group">
            <label htmlFor="insuranceType">Insurance Type</label>
            <select 
              id="insuranceType" 
              name="insuranceType" 
              value={formState.insuranceType} 
              onChange={handleChange}
              required
            >
              <option value="">Select insurance type</option>
              <option value="Smart Contract Exploit">Smart Contract Exploit</option>
              <option value="Oracle Failure">Oracle Failure</option>
              <option value="Bridge Hack">Bridge Hack</option>
              <option value="Custom">Custom</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Event Description</label>
            <textarea 
              id="description" 
              name="description" 
              value={formState.description} 
              onChange={handleChange}
              placeholder="Describe the event you want to insure against"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="coverageAmount">Coverage Amount (ETH/USDC)</label>
              <input 
                type="number" 
                id="coverageAmount" 
                name="coverageAmount" 
                value={formState.coverageAmount} 
                onChange={handleChange}
                placeholder="Amount"
                min="0.01"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="duration">Coverage Duration (days)</label>
              <select 
                id="duration" 
                name="duration" 
                value={formState.duration} 
                onChange={handleChange}
                required
              >
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
                <option value="180">180 days</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="protocol">Target Protocol / Contract Address</label>
            <input 
              type="text" 
              id="protocol" 
              name="protocol" 
              value={formState.protocol} 
              onChange={handleChange}
              placeholder="Protocol name or contract address"
              required
            />
          </div>

          {formState.insuranceType === 'Custom' && (
            <div className="form-group">
              <label htmlFor="vaultAddress">Vault/Pool Address (Optional)</label>
              <input 
                type="text" 
                id="vaultAddress" 
                name="vaultAddress" 
                value={formState.vaultAddress} 
                onChange={handleChange}
                placeholder="0x..."
              />
            </div>
          )}

          <button type="submit" className="btn-primary">Get Quote</button>
        </form>

        {showQuote && (
          <div className="quote-result">
            <h2>Your Insurance Quote</h2>
            <div className="quote-details">
              <div className="quote-item">
                <span>Coverage Amount:</span>
                <span>{formState.coverageAmount} {formState.coverageAmount > 1000 ? 'USDC' : 'ETH'}</span>
              </div>
              <div className="quote-item">
                <span>Duration:</span>
                <span>{formState.duration} days</span>
              </div>
              <div className="quote-item highlight">
                <span>Premium:</span>
                <span>{premium} {formState.coverageAmount > 1000 ? 'USDC' : 'ETH'}</span>
              </div>
            </div>
            <button className="btn-primary" onClick={handlePurchase}>Purchase Insurance</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default InsurancePage;