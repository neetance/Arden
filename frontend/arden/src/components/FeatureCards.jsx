import React from "react";

const FeatureCards = () => {
  const features = [
    {
      id: 1,
      title: "Custom Coverage",
      description:
        "Tailor insurance policies to your specific DeFi portfolio needs and risk tolerance.",
      icon: "🛡️",
    },
    {
      id: 2,
      title: "DAO Governance",
      description:
        "Community-driven decisions on claims, policies, and protocol improvements.",
      icon: "🏛️",
    },
    {
      id: 3,
      title: "Multi-Protocol",
      description:
        "Coverage for all major DeFi platforms, DEXs, lending protocols, and yield farms.",
      icon: "⚡",
    },
    {
      id: 4,
      title: "Instant Claims",
      description:
        "Automated verification and payout system for qualifying insurance claims.",
      icon: "🔄",
    },
  ];

  return (
    <section className="features">
      <h2 className="features-title">Comprehensive Protection</h2>
      <p className="features-subtitle">
        Arden offers cutting-edge insurance solutions for the decentralized
        finance ecosystem
      </p>
      <div className="feature-cards">
        {features.map((feature) => (
          <div className="feature-card" key={feature.id}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
