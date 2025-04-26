import './claims.css';
function ClaimFeed() {
  // Mock data for frontend display
  const recentClaims = [
    {
      id: "CL-2025-042",
      type: "Smart Contract Exploit",
      protocol: "LendingPool Protocol",
      amount: "$120,000",
      status: "Approved",
      timestamp: "3 hours ago"
    },
    {
      id: "CL-2025-041",
      type: "Oracle Failure",
      protocol: "StableSwap Finance",
      amount: "$85,000",
      status: "Under Review",
      timestamp: "6 hours ago"
    },
    {
      id: "CL-2025-040",
      type: "Bridge Hack",
      protocol: "CrossChain Bridge",
      amount: "$250,000",
      status: "Approved",
      timestamp: "1 day ago"
    }
  ];

  return (
    <div className="claim-feed">
      {recentClaims.map(claim => (
        <div key={claim.id} className="claim-card">
          <div className="claim-header">
            <span className="claim-id">{claim.id}</span>
            <span className={`claim-status ${claim.status.toLowerCase().replace(" ", "-")}`}>
              {claim.status}
            </span>
          </div>
          <h4>{claim.protocol}</h4>
          <div className="claim-details">
            <p><strong>Type:</strong> {claim.type}</p>
            <p><strong>Amount:</strong> {claim.amount}</p>
            <p className="claim-timestamp">{claim.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ClaimFeed;