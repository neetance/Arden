# Arden

Arden is a decentralized insurance protocol deployed on Swell Chain that leverages EigenLayer’s Actively Validated Services (AVS) to handle secure and decentralized claim validation. It introduces trustless, community-driven claim processing while maintaining transparent on-chain logic and off-chain data verification via IPFS and AVS nodes.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Workflow](#workflow)
- [AVS Integration with EigenLayer](#avs-integration-with-eigenlayer)
- [Smart Contracts](#smart-contracts)
- [IPFS Integration](#ipfs-integration)
- [Slashing Mechanism](#slashing-mechanism)
- [Frontend Interface](#frontend-interface)

---

## Overview

Arden enables users to purchase customizable insurance policies which are minted as NFTs. Users can submit claims with supporting metadata stored on IPFS. A decentralized set of EigenLayer AVS operators vote on the validity of the claims. Claims that meet a quorum threshold are settled automatically. AVS operators who vote dishonestly can be penalized via slashing.

---

## Key Features

- NFT-based policies with user-defined metadata
- Integration with EigenLayer’s AVS for off-chain claim validation
- On-chain slashing logic for dishonest voting
- IPFS integration for decentralized file storage
- Transparent policy lifecycle and dispute resolution process

---

## Workflow

1. User fills out an insurance policy form on the frontend.
2. Policy details and user-uploaded images are stored on IPFS.
3. An NFT is minted to represent the policy with metadata pointing to IPFS.
4. If a user initiates a claim:
   - Metadata and evidence are again uploaded to IPFS.
   - The claim is registered on-chain.
5. EigenLayer AVS operators review the claim and cast votes off-chain.
6. The vote result is aggregated and submitted to the smart contract.
7. If the vote passes the threshold (e.g., 80% agreement), the payout is executed.
8. If a node is proven to vote dishonestly, it is slashed based on recorded proof.

---

## AVS Integration with EigenLayer

Arden’s AVS logic relies on a subset of EigenLayer restakers that run the Arden AVS service. These nodes:

- Are registered via a smart contract on Swell Chain.
- Periodically fetch new claims from the blockchain.
- Evaluate claim metadata (e.g., images, IPFS records).
- Cast on-chain votes.


AVS acts as an oracle and consensus layer for validating real-world inputs without centralized trust.

---

## Smart Contracts

- `ardenCore.sol`
- `ardenNFT.sol`
- `AVSManager.sol.sol`
- `pool.sol`
- `poolManager.sol`
- All contracts are written in Solidity and tested with Foundry.

---

## IPFS Integration

Arden uses IPFS to store:

- Policy metadata (e.g., coverage amount, duration, conditions)
- User-uploaded images or documents for verification

Frontend code handles:
- Encoding JSON metadata
- Uploading via Infura or web3.storage
- Retrieving IPFS data using content hash (CID)

---

## Frontend Interface

The frontend is built using React and includes:

- Policy creation dashboard
- NFT viewer for active policies
- Claim submission interface
- Voting history and AVS node registry

Optional integrations:
- WalletConnect or MetaMask
- File/image preview before IPFS upload
- AVS node explorer panel
