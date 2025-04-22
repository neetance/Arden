// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ISignatureUtils} from "../../lib/eigenlayer-contracts/src/contracts/interfaces/ISignatureUtils.sol";
import {IAVSDirectory} from "../../lib/eigenlayer-contracts/src/contracts/interfaces/IAVSDirectory.sol";
import {IDelegationManager} from "../../lib/eigenlayer-contracts/src/contracts/interfaces/IDelegationManager.sol";
import {ECDSA} from "../../lib/solady/src/utils/ECDSA.sol";

contract MyServiceManager {
    error Not_Operator();
    error Invalid_Sender();
    error Invalid_Claim();
    error Already_Voted();
    error Not_Delegated();
    error Reached_Deadline();

    event NewClaim(uint256 indexed claimId, uint32 claimCreatedBlock);
    event ClaimResponded(
        address indexed operator,
        uint256 indexed claimId,
        uint32 claimCreatedBlock
    );

    using ECDSA for bytes32;

    address public immutable avsDirectory;
    address public immutable delegationManagerAddr;
    mapping(address => bool) public operatorRegistered;
    mapping(uint256 => bytes32) public claimHashes;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(uint256 => Claim) public claims;

    struct Claim {
        uint256 claimId;
        uint32 claimCreatedBlock;
        uint256 posVotes;
        uint256 negVotes;
        uint256 deadline;
    }

    modifier onlyOperator() {
        if (!operatorRegistered[msg.sender]) revert Not_Operator();
        _;
    }

    constructor(address _avsDirectory, address _delegationManager) {
        avsDirectory = _avsDirectory;
        delegationManagerAddr = _delegationManager;
    }

    function registerOperatorToAVS(
        address operator,
        ISignatureUtils.SignatureWithSaltAndExpiry memory operatorSignature
    ) external {
        IDelegationManager delegationManager = IDelegationManager(
            delegationManagerAddr
        );
        if (!delegationManager.isDelegated(operator)) revert Not_Delegated();

        IAVSDirectory(avsDirectory).registerOperatorToAVS(
            operator,
            operatorSignature
        );
        operatorRegistered[operator] = true;
    }

    function deregisterOperatorFromAVS(address operator) external onlyOperator {
        if (msg.sender != operator) {
            revert Invalid_Sender();
        }

        IAVSDirectory(avsDirectory).deregisterOperatorFromAVS(operator);
        operatorRegistered[operator] = false;
    }

    function createClaim(uint256 claimId) external returns (Claim memory) {
        Claim memory claim;
        claim.claimId = claimId;
        claim.claimCreatedBlock = uint32(block.number);
        claim.posVotes = 0;
        claim.negVotes = 0;
        claim.deadline = uint256(block.timestamp) + 7 days;

        claimHashes[claimId] = keccak256(abi.encode(claim));
        claims[claimId] = claim;

        emit NewClaim(claim.claimId, claim.claimCreatedBlock);
        return claim;
    }

    function respondToClaim(
        Claim memory claim,
        bool vote,
        bytes memory signature
    ) external onlyOperator {
        if (keccak256(abi.encode(claim)) != claimHashes[claim.claimId]) {
            revert Invalid_Claim();
        }
        if (block.timestamp > claim.deadline) revert Reached_Deadline();
        if (hasVoted[claim.claimId][msg.sender]) revert Already_Voted();
        hasVoted[claim.claimId][msg.sender] = true;

        bytes32 messageHash = keccak256(abi.encodePacked(claim.claimId, vote));
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
        address signer = ethSignedMessageHash.recover(signature);
        if (signer != msg.sender) revert Invalid_Sender();

        Claim storage storedClaim = claims[claim.claimId];
        if (vote) storedClaim.posVotes++;
        else storedClaim.negVotes++;

        emit ClaimResponded(msg.sender, claim.claimId, claim.claimCreatedBlock);
    }

    function getResult(
        uint256 claimId
    ) external view returns (uint256, uint256) {
        Claim memory claim = claims[claimId];
        return (claim.posVotes, claim.negVotes);
    }
}
