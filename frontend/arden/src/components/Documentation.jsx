import React from "react";
import {
  Shield,
  FileCheck,
  Users,
  BarChart3,
  Link,
  ChevronRight,
} from "lucide-react";

const Documentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white pb-20">
      {/* Hero Section */}
      <div className="pt-24 pb-12 px-8 max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Shield className="text-blue-400 mr-3" size={32} />
          <h1 className="text-4xl font-bold tracking-tight">
            Arden Documentation
          </h1>
        </div>
        <p className="text-xl text-gray-300 max-w-3xl">
          A community-governed DeFi insurance protocol built on Swellchain,
          secured by EigenLayer
        </p>
      </div>

      {/* Overview Section */}
      <section className="px-8 py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">
          Overview
        </h2>
        <div className="prose prose-invert max-w-none">
          <p className="text-lg mb-4">
            Arden is a decentralized insurance protocol designed for DeFi
            users, built on Swellchain. It enables users to purchase insurance
            against protocol-specific risks such as smart contract exploits, rug
            pulls, or stablecoin depegs by providing a clear description of the
            covered event.
          </p>
          <p className="text-lg mb-8">
            What makes Arden unique is its approach to claim handling - all
            claims are processed through a DAO of Liquidity Providers (LPs) who
            have restaked via EigenLayer, collectively deciding outcomes based
            on user-submitted evidence.
          </p>

          <div className="bg-gray-800 p-6 rounded-lg mb-8 border border-gray-700">
            <h3 className="text-xl font-medium mb-4 text-blue-400">
              Key Features
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <ChevronRight
                  className="text-blue-400 mr-2 mt-1 flex-shrink-0"
                  size={18}
                />
                <span>Custom policies - users define risks & protocols</span>
              </li>
              <li className="flex items-start">
                <ChevronRight
                  className="text-blue-400 mr-2 mt-1 flex-shrink-0"
                  size={18}
                />
                <span>
                  DAO governance - EigenLayer-restaked LPs decide claims
                </span>
              </li>
              <li className="flex items-start">
                <ChevronRight
                  className="text-blue-400 mr-2 mt-1 flex-shrink-0"
                  size={18}
                />
                <span>Flexible insurance templates for common risks</span>
              </li>
              <li className="flex items-start">
                <ChevronRight
                  className="text-blue-400 mr-2 mt-1 flex-shrink-0"
                  size={18}
                />
                <span>LP reward sharing (premiums + yield)</span>
              </li>
              <li className="flex items-start">
                <ChevronRight
                  className="text-blue-400 mr-2 mt-1 flex-shrink-0"
                  size={18}
                />
                <span>
                  EigenLayer restaking for enhanced security and accountability
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="px-8 py-12 bg-gray-800 bg-opacity-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 border-b border-gray-700 pb-2">
            Architecture Overview
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 h-full">
              <h3 className="flex items-center text-xl font-medium mb-4 text-blue-400">
                <FileCheck className="mr-2" size={24} />
                Frontend (React + Wagmi)
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Buy insurance flow</li>
                <li>• Submit claim + evidence</li>
                <li>• DAO voting interface for LPs</li>
                <li>• Insurance templates for common risks</li>
                <li>• LP staking and restaking interface</li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 h-full">
              <h3 className="flex items-center text-xl font-medium mb-4 text-blue-400">
                <Link className="mr-2" size={24} />
                Smart Contracts (Solidity)
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li>• InsurancePolicyManager.sol – create/buy policies</li>
                <li>• ClaimManager.sol – submit claims, store evidence</li>
                <li>• RestakedDAO.sol – LP staking + voting on claims</li>
                <li>• LPVault.sol – manage premiums, payouts, distribution</li>
                <li>• EigenLayerIntegration.sol – interface for EigenLayer</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="flex items-center text-xl font-medium mb-4 text-blue-400">
              <Users className="mr-2" size={24} />
              EigenLayer Integration
            </h3>
            <div className="text-gray-300">
              <p className="mb-4">
                EigenLayer integration is a{" "}
                <span className="font-semibold text-blue-400">mandatory</span>{" "}
                component of Arden:
              </p>
              <ul className="space-y-3">
                <li>
                  • LPs must restake ETH via EigenLayer to participate in
                  Arden's DAO
                </li>
                <li>
                  • Only restaked LPs are eligible to vote on claim outcomes
                </li>
                <li>
                  • Restaking adds economic security by making governance more
                  credible
                </li>
                <li>
                  • Long-term: Arden can implement slashing conditions for
                  bad faith votes
                </li>
                <li>
                  • Restaked LPs gain premium share and voting power in the DAO
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="px-8 py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">
          Workflow: End-to-End Example
        </h2>

        <div className="space-y-8">
          <div className="flex">
            <div className="flex-shrink-0 mr-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold">
                1
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2 text-blue-400">
                Insurance Purchase
              </h3>
              <p className="mb-3">
                User wants to insure their assets on a DeFi protocol.
              </p>
              <div className="bg-gray-800 p-4 rounded border border-gray-700">
                <ul className="space-y-2 text-gray-300">
                  <li>• Selects "Custom Policy" on Arden</li>
                  <li>
                    • Defines the risk event (e.g., "Protocol X LP vault gets
                    exploited")
                  </li>
                  <li>• Sets coverage amount and duration</li>
                  <li>• Pays premium which is sent to LPVault</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="flex-shrink-0 mr-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold">
                2
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2 text-blue-400">
                Incident Occurs
              </h3>
              <p className="mb-3">
                If an insured event happens, the user can file a claim.
              </p>
              <div className="bg-gray-800 p-4 rounded border border-gray-700">
                <ul className="space-y-2 text-gray-300">
                  <li>• User returns to Arden and files a claim</li>
                  <li>• Provides description of the incident</li>
                  <li>
                    • Submits evidence: screenshots, transaction hashes, links
                  </li>
                  <li>• Claim is recorded in ClaimManager.sol</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="flex-shrink-0 mr-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold">
                3
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2 text-blue-400">
                DAO Claim Verification
              </h3>
              <p className="mb-3">
                EigenLayer-restaked LPs evaluate and vote on the claim.
              </p>
              <div className="bg-gray-800 p-4 rounded border border-gray-700">
                <ul className="space-y-2 text-gray-300">
                  <li>• LPs are notified of the new claim</li>
                  <li>• 72-hour voting period begins</li>
                  <li>• LPs vote: Approve / Reject / Flag</li>
                  <li>• Decision based on quorum + majority</li>
                  <li>• Voting power weighted by restaked amount</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="flex-shrink-0 mr-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold">
                4
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2 text-blue-400">
                Payout or Denial
              </h3>
              <p className="mb-3">
                Based on the DAO vote, the claim is either approved or denied.
              </p>
              <div className="bg-gray-800 p-4 rounded border border-gray-700">
                <ul className="space-y-2 text-gray-300">
                  <li>
                    • If approved: LPVault pays the user the covered amount
                  </li>
                  <li>• If denied: No payout is made</li>
                  <li>
                    • LPs receive their share of premiums and yield regardless
                  </li>
                  <li>• If flagged: Claim escalated to further review</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Contract Modules */}
      <section className="px-8 py-12 bg-gray-800 bg-opacity-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 border-b border-gray-700 pb-2">
            Smart Contract Modules
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-900">
                  <th className="px-6 py-3 font-medium">Contract</th>
                  <th className="px-6 py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr className="bg-gray-800 bg-opacity-50">
                  <td className="px-6 py-4 font-mono text-sm text-blue-400">
                    InsurancePolicyManager.sol
                  </td>
                  <td className="px-6 py-4">
                    Create/manage insurance policies
                  </td>
                </tr>
                <tr className="bg-gray-800 bg-opacity-30">
                  <td className="px-6 py-4 font-mono text-sm text-blue-400">
                    ClaimManager.sol
                  </td>
                  <td className="px-6 py-4">Submit/view insurance claims</td>
                </tr>
                <tr className="bg-gray-800 bg-opacity-50">
                  <td className="px-6 py-4 font-mono text-sm text-blue-400">
                    RestakedDAO.sol
                  </td>
                  <td className="px-6 py-4">
                    DAO of LPs who restake via EigenLayer, votes on claims
                  </td>
                </tr>
                <tr className="bg-gray-800 bg-opacity-30">
                  <td className="px-6 py-4 font-mono text-sm text-blue-400">
                    LPVault.sol
                  </td>
                  <td className="px-6 py-4">
                    Handles liquidity, premium distribution, and payouts
                  </td>
                </tr>
                <tr className="bg-gray-800 bg-opacity-50">
                  <td className="px-6 py-4 font-mono text-sm text-blue-400">
                    EigenLayerIntegration.sol
                  </td>
                  <td className="px-6 py-4">
                    Verifies LP restaking, syncs data with EigenLayer
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Future Development */}
      <section className="px-8 py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">
          Future Development
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-blue-400">
              Reputation System
            </h3>
            <p className="text-gray-300">
              Tracking DAO member voting history to establish trustworthiness
              and accuracy
            </p>
          </div>

          <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-blue-400">
              Insurance NFT Receipts
            </h3>
            <p className="text-gray-300">
              Tradable NFTs representing insurance policies for secondary market
              liquidity
            </p>
          </div>

          <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-blue-400">
              Coverage Bundles
            </h3>
            <p className="text-gray-300">
              Pre-packaged insurance bundles like "Lending Pack" or "DEX Combo"
            </p>
          </div>

          <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-blue-400">
              ZK Claim Verification
            </h3>
            <p className="text-gray-300">
              Privacy-preserving claim verification using zero-knowledge proofs
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="px-8 py-12 bg-gray-800 bg-opacity-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 border-b border-gray-700 pb-2">
            Protocol Statistics
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
              <BarChart3 className="mx-auto text-blue-400 mb-2" size={28} />
              <div className="text-3xl font-bold mb-1">$0</div>
              <div className="text-gray-400 text-sm">Total Value Locked</div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
              <Shield className="mx-auto text-blue-400 mb-2" size={28} />
              <div className="text-3xl font-bold mb-1">0</div>
              <div className="text-gray-400 text-sm">Active Policies</div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
              <FileCheck className="mx-auto text-blue-400 mb-2" size={28} />
              <div className="text-3xl font-bold mb-1">0</div>
              <div className="text-gray-400 text-sm">Claims Processed</div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
              <Users className="mx-auto text-blue-400 mb-2" size={28} />
              <div className="text-3xl font-bold mb-1">0</div>
              <div className="text-gray-400 text-sm">Restaked LPs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center mb-6">
            <Shield className="text-blue-400 mr-2" size={24} />
            <h2 className="text-2xl font-semibold tracking-tight">Arden</h2>
          </div>
          <p className="text-gray-400 mb-8">
            Community-Governed DeFi Insurance Protocol
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="javascript:void(0)"
              className="text-gray-400 hover:text-white"
            >
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Discord
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              GitHub
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Documentation
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Documentation;
