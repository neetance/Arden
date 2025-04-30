import { useState } from 'react';
import './register.css';
import { PinataSDK } from "pinata"
import { ethers } from 'ethers';

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

  const calculatePremium = async() => {
    const provider = new ethers.JsonRpcProvider(import.meta.env.VITE_APP_RPC_URL);
    const wallet = new ethers.Wallet(import.meta.env.VITE_APP_PRIVATE_KEY, provider);
    const abi = [{"type":"constructor","inputs":[{"name":"avsManagerAddr","type":"address","internalType":"address"},{"name":"poolManagerAddr","type":"address","internalType":"address"},{"name":"nftAddr","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},{"type":"function","name":"claim","inputs":[{"name":"id","type":"uint256","internalType":"uint256"},{"name":"proof","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"getPremium","inputs":[{"name":"insuranceType","type":"uint8","internalType":"uint8"},{"name":"coverageAmountWei","type":"uint256","internalType":"uint256"},{"name":"durationDays","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"pure"},{"type":"function","name":"processClaim","inputs":[{"name":"id","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"nonpayable"},{"type":"function","name":"registerPolicy","inputs":[{"name":"id","type":"uint256","internalType":"uint256"},{"name":"owner","type":"address","internalType":"address"},{"name":"description","type":"string","internalType":"string"},{"name":"duration","type":"uint256","internalType":"uint256"},{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"renewPolicy","inputs":[{"name":"id","type":"uint256","internalType":"uint256"},{"name":"duration","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"s_ardenNFT","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract ArdenNFT"}],"stateMutability":"view"},{"type":"function","name":"s_avsManager","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract MyServiceManager"}],"stateMutability":"view"},{"type":"function","name":"s_poolManager","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract PoolManager"}],"stateMutability":"view"},{"type":"function","name":"s_totalCount","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"event","name":"PayoutMade","inputs":[{"name":"to","type":"address","indexed":true,"internalType":"address"},{"name":"voters","type":"address[]","indexed":true,"internalType":"address[]"},{"name":"amount","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"PolicyClaimed","inputs":[{"name":"id","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"proof","type":"string","indexed":false,"internalType":"string"}],"anonymous":false},{"type":"event","name":"PolicyProcessed","inputs":[{"name":"id","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"success","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"event","name":"PolicyRegistered","inputs":[{"name":"id","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"endTime","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"PolicyRenewed","inputs":[{"name":"id","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"endTime","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"error","name":"Not_Owner","inputs":[{"name":"id","type":"uint256","internalType":"uint256"},{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"Policy_Already_Active","inputs":[{"name":"id","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"Policy_Already_Claimed","inputs":[{"name":"id","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"Policy_Already_Processed","inputs":[{"name":"id","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"Policy_Not_Active","inputs":[{"name":"id","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"Policy_Not_Claimed","inputs":[{"name":"id","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"Policy_Not_Found","inputs":[{"name":"id","type":"uint256","internalType":"uint256"}]}]
    const address = '0x8e2F1e3fb932df44DF664A24Ff2a0aBa97Cf00eA';
    const contract = new ethers.Contract(address, abi, wallet);
    const insuranceTypeNum = {
      'Smart Contract Exploit': 0,
      'Oracle Failure': 1,
      'Bridge Hack': 2,
      'Custom': 3
    }[formState.insuranceType];
    const coverageAmount = ethers.parseUnits(formState.coverageAmount.toString(), 18);
    const duration = formState.duration;

    const premium = await contract.getPremium(insuranceTypeNum, coverageAmount, duration);
    const formattedPremium = ethers.formatUnits(premium, 18);

    return formattedPremium;
  };

  const handleGetQuote = async(e) => {
    e.preventDefault();
    const calculatedPremium = await calculatePremium();
    setPremium(calculatedPremium);
    setShowQuote(true);
  };

  const handlePurchase = async(e) => {
    e.preventDefault();
    const metadata = {
      insuranceType: formState.insuranceType,
      description: formState.description,
      coverageAmount: formState.coverageAmount,
      duration: formState.duration,
      protocol: formState.protocol,
      vaultAddress: formState.vaultAddress
    }

    const pinata = new PinataSDK({
      pinataJwt: import.meta.env.VITE_APP_PINATA_JWT,
      pinataGateway: import.meta.env.VITE_APP_PINATA_GATEWAY,
    })

    const upload = await pinata.upload.public.json(metadata)
    console.log("Metadata uploaded to IPFS:", upload);
    const cid = upload.cid;
    const uri = `ipfs.io/ipfs/${cid}`

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const address = '0x1d14831b72c9296D3a26F7a798e0C19e3795fe16';
    const abi = [{"type":"constructor","inputs":[{"name":"poolAddr","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},{"type":"function","name":"approve","inputs":[{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"balanceOf","inputs":[{"name":"owner","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"core","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract ArdenCore"}],"stateMutability":"view"},{"type":"function","name":"getApproved","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"getClaimData","inputs":[{"name":"id","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"getDescription","inputs":[{"name":"id","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"isApprovedForAll","inputs":[{"name":"owner","type":"address","internalType":"address"},{"name":"operator","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"mint","inputs":[{"name":"to","type":"address","internalType":"address"},{"name":"description","type":"string","internalType":"string"},{"name":"duration","type":"uint256","internalType":"uint256"},{"name":"amount","type":"uint256","internalType":"uint256"},{"name":"insuranceType","type":"uint8","internalType":"uint8"},{"name":"uri","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"name","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"ownerOf","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"pool","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"renounceOwnership","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"safeTransferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"safeTransferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"},{"name":"data","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setApprovalForAll","inputs":[{"name":"operator","type":"address","internalType":"address"},{"name":"approved","type":"bool","internalType":"bool"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setClaimData","inputs":[{"name":"id","type":"uint256","internalType":"uint256"},{"name":"claim","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setCore","inputs":[{"name":"coreAddr","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"supportsInterface","inputs":[{"name":"interfaceId","type":"bytes4","internalType":"bytes4"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"symbol","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"tokenId","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"tokenURI","inputs":[{"name":"id","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"transferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"transferOwnership","inputs":[{"name":"newOwner","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"event","name":"Approval","inputs":[{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"approved","type":"address","indexed":true,"internalType":"address"},{"name":"tokenId","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"ApprovalForAll","inputs":[{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"operator","type":"address","indexed":true,"internalType":"address"},{"name":"approved","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"name":"previousOwner","type":"address","indexed":true,"internalType":"address"},{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"name":"from","type":"address","indexed":true,"internalType":"address"},{"name":"to","type":"address","indexed":true,"internalType":"address"},{"name":"tokenId","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"error","name":"ERC721IncorrectOwner","inputs":[{"name":"sender","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"},{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InsufficientApproval","inputs":[{"name":"operator","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"ERC721InvalidApprover","inputs":[{"name":"approver","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InvalidOperator","inputs":[{"name":"operator","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InvalidOwner","inputs":[{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InvalidReceiver","inputs":[{"name":"receiver","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InvalidSender","inputs":[{"name":"sender","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721NonexistentToken","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"Invalid_Premium_Amount","inputs":[]},{"type":"error","name":"OwnableInvalidOwner","inputs":[{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"OwnableUnauthorizedAccount","inputs":[{"name":"account","type":"address","internalType":"address"}]}]
    const contract = new ethers.Contract(address, abi, signer);
    const amount = ethers.parseUnits(formState.coverageAmount.toString(), 18);
    const insuranceTypeNum = {
      'Smart Contract Exploit': 0,
      'Oracle Failure': 1,
      'Bridge Hack': 2,
      'Custom': 3
    }[formState.insuranceType];

    const tx = await contract.mint(signer.getAddress(), metadata.description, metadata.duration, amount, insuranceTypeNum, uri, {value: ethers.parseUnits(premium.toString(), 18), gasLimit: 40000});
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