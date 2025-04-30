import { useState, useEffect } from "react";
import "./LiquidityPage.css";
import {
  FaShieldAlt,
  FaChartLine,
  FaLock,
  FaExchangeAlt,
  FaHistory,
  FaInfoCircle,
} from "react-icons/fa";

const LiquidityPage = () => {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("0.00");
  const [apy, setApy] = useState("12.8");
  const [totalLiquidity, setTotalLiquidity] = useState("1,248,723.45");
  const [yourLiquidity, setYourLiquidity] = useState("0.00");
  const [yourRewards, setYourRewards] = useState("0.00");
  const [isConnected, setIsConnected] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Mock data for liquidity providers
  const liquidityProviders = [
    {
      address: "0x71C...9E3f",
      amount: "245,340.00",
      share: "19.65%",
      rewards: "2,834.21",
    },
    {
      address: "0x43A...2B7d",
      amount: "183,251.12",
      share: "14.67%",
      rewards: "2,115.92",
    },
    {
      address: "0x89F...6C0e",
      amount: "124,982.38",
      share: "10.01%",
      rewards: "1,443.79",
    },
    {
      address: "0x23D...5F4a",
      amount: "98,742.19",
      share: "7.91%",
      rewards: "1,140.57",
    },
    {
      address: "0xB7C...1A2b",
      amount: "76,321.45",
      share: "6.11%",
      rewards: "881.71",
    },
  ];

  // Mock data for recent transactions
  const recentTransactions = [
    {
      type: "Add",
      address: "0x43A...2B7d",
      amount: "1.53",
      time: "2 mins ago",
    },
    {
      type: "Remove",
      address: "0x71C...9E3f",
      amount: "0.63",
      time: "13 mins ago",
    },
    {
      type: "Add",
      address: "0xB7C...1A2b",
      amount: "3.67",
      time: "37 mins ago",
    },
    {
      type: "Add",
      address: "0x23D...5F4a",
      amount: "0.36",
      time: "1 hour ago",
    },
    {
      type: "Remove",
      address: "0x89F...6C0e",
      amount: "1.83",
      time: "2 hours ago",
    },
  ];

  useEffect(() => {
    // Mock data loading
    const timer = setTimeout(() => {
      if (isConnected) {
        setBalance("125,340.00");
        setYourLiquidity("24,680.00");
        setYourRewards("356.92");
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [isConnected]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleAddLiquidity = () => {
    if (!isConnected) {
      setIsConnected(true);
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    // Mock adding liquidity
    const newLiquidity =
      parseFloat(yourLiquidity.replace(/,/g, "")) + parseFloat(amount);
    setYourLiquidity(
      newLiquidity.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
    setAmount("");

    // Show success message or transaction confirmation here
    alert(
      `Successfully added ${parseFloat(amount).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} to the liquidity pool!`
    );
  };

  return (
    <div className="liquidity-page">
      <div className="liquidity-container">
        <div className="left-panel">
          <div className="header">
            <div className="protocol-logo">
              <FaShieldAlt />
            </div>
            <div className="protocol-name">
              <h1>ARDEN</h1>
              <p>Decentralized Insurance Protocol on Swellchain</p>
            </div>
          </div>

          <div className="main-card">
            <div className="card-header">
              <h2>Provide Liquidity</h2>
              <p>Earn rewards while securing the protocol</p>
            </div>

            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-label">Current APY</span>
                <span className="stat-value highlight">{apy}%</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Liquidity</span>
                <span className="stat-value">{totalLiquidity}ETH</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Your Balance</span>
                <span className="stat-value">{balance}ETH</span>
              </div>
            </div>

            <div className="input-container">
              <div className="input-header">
                <span>Amount to Add</span>
                <span
                  className="max-button"
                  onClick={() => setAmount(balance.replace(/,/g, ""))}
                >
                  MAX
                </span>
              </div>
              <div className="input-field">
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={handleAmountChange}
                />
                <div className="token-selector">
                  <div className="token-logo">2.6ETHJ</div>
                  <span>ETH</span>
                </div>
              </div>
            </div>

            {/* <div className="info-row">
              <div className="info-item">
                <span>Liquidity Fee</span>
                <span className="tooltip-container">
                  0.3% 
                  <FaInfoCircle 
                    className="info-icon" 
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  />
                  {showTooltip && (
                    <div className="tooltip">
                      This fee is used to reward validators and cover protocol expenses
                    </div>
                  )}
                </span>
              </div>
              <div className="info-item">
                <span>Estimated Annual Yield</span>
                <span>${amount ? ((parseFloat(amount) * parseFloat(apy)) / 100).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '0.00'}</span>
              </div>
            </div> */}

            <button className="add-liquidity-btn" onClick={handleAddLiquidity}>
              {isConnected ? "Add Liquidity" : "Add Liquidity"}
            </button>

            <div className="your-stats">
              <div className="stat-box">
                <span className="stat-box-label">Your Liquidity</span>
                <span className="stat-box-value">{yourLiquidity}ETH</span>
              </div>
              <div className="stat-box">
                <span className="stat-box-label">Your Rewards</span>
                <span className="stat-box-value highlight">
                  {yourRewards}ETH
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="panel-card top-providers">
            <div className="panel-header">
              <FaChartLine className="panel-icon" />
              <h3>Top Liquidity Providers</h3>
            </div>
            <div className="providers-list">
              <div className="list-header">
                <span>Address</span>
                <span>Amount</span>
                <span>Share</span>
                <span>Rewards</span>
              </div>
              {liquidityProviders.map((provider, index) => (
                <div className="list-item" key={index}>
                  <span className="address">{provider.address}</span>
                  <span>{provider.amount}ETH</span>
                  <span>{provider.share}</span>
                  <span className="highlight">{provider.rewards}ETH</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-card recent-activity">
            <div className="panel-header">
              <FaHistory className="panel-icon" />
              <h3>Recent Transactions</h3>
            </div>
            <div className="transactions-list">
              {recentTransactions.map((tx, index) => (
                <div className="tx-item" key={index}>
                  <div className="tx-icon">
                    {tx.type === "Add" ? (
                      <FaExchangeAlt className="add" />
                    ) : (
                      <FaExchangeAlt className="remove" />
                    )}
                  </div>
                  <div className="tx-details">
                    <div className="tx-primary">
                      <span
                        className={tx.type === "Add" ? "tx-add" : "tx-remove"}
                      >
                        {tx.type} Liquidity: {tx.amount}ETH
                      </span>
                      <span className="tx-time">{tx.time}</span>
                    </div>
                    <div className="tx-address">{tx.address}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-card security-info">
            <div className="panel-header">
              <FaLock className="panel-icon" />
              <h3>Security Information</h3>
            </div>
            <div className="security-content">
              <p>
                All funds are secured by EigenLayer restakers and governed by a
                DAO. Claims verification is performed by trusted validators with
                economic incentives to maintain honest participation.
              </p>
              <div className="security-stats">
                <div className="security-stat">
                  <span>Validators</span>
                  <span>124</span>
                </div>
                <div className="security-stat">
                  <span>Slashing Rate</span>
                  <span>5%</span>
                </div>
                <div className="security-stat">
                  <span>Response Time</span>
                  <span>~4 hrs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidityPage;
