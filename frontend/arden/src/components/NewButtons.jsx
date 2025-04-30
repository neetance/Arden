import React from "react";
import { Link } from "react-router-dom";
import './NewButtons.css'; // Assuming you have a CSS file for styling
import { ethers } from "ethers";

const becomeValidator = async() => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contractAddress = "0x16ab69Ed506F7F3aBFf5Ee3565e57A22C5f3c305";
  const abi = [{"type":"constructor","inputs":[{"name":"_avsDirectory","type":"address","internalType":"address"},{"name":"_delegationManager","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},{"type":"function","name":"avsDirectory","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"claimHashes","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"view"},{"type":"function","name":"claims","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"claimId","type":"uint256","internalType":"uint256"},{"name":"claimCreatedBlock","type":"uint32","internalType":"uint32"},{"name":"posVotes","type":"uint256","internalType":"uint256"},{"name":"negVotes","type":"uint256","internalType":"uint256"},{"name":"deadline","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"createClaim","inputs":[{"name":"claimId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"tuple","internalType":"struct MyServiceManager.Claim","components":[{"name":"claimId","type":"uint256","internalType":"uint256"},{"name":"claimCreatedBlock","type":"uint32","internalType":"uint32"},{"name":"posVotes","type":"uint256","internalType":"uint256"},{"name":"negVotes","type":"uint256","internalType":"uint256"},{"name":"deadline","type":"uint256","internalType":"uint256"},{"name":"voters","type":"address[]","internalType":"address[]"}]}],"stateMutability":"nonpayable"},{"type":"function","name":"delegationManagerAddr","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"deregisterOperatorFromAVS","inputs":[{"name":"operator","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"getResult","inputs":[{"name":"claimId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"},{"name":"","type":"uint256","internalType":"uint256"},{"name":"","type":"address[]","internalType":"address[]"}],"stateMutability":"view"},{"type":"function","name":"hasVoted","inputs":[{"name":"","type":"uint256","internalType":"uint256"},{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"operatorRegistered","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"registerOperatorToAVS","inputs":[{"name":"operator","type":"address","internalType":"address"},{"name":"operatorSignature","type":"tuple","internalType":"struct ISignatureUtils.SignatureWithSaltAndExpiry","components":[{"name":"signature","type":"bytes","internalType":"bytes"},{"name":"salt","type":"bytes32","internalType":"bytes32"},{"name":"expiry","type":"uint256","internalType":"uint256"}]}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"respondToClaim","inputs":[{"name":"claim","type":"tuple","internalType":"struct MyServiceManager.Claim","components":[{"name":"claimId","type":"uint256","internalType":"uint256"},{"name":"claimCreatedBlock","type":"uint32","internalType":"uint32"},{"name":"posVotes","type":"uint256","internalType":"uint256"},{"name":"negVotes","type":"uint256","internalType":"uint256"},{"name":"deadline","type":"uint256","internalType":"uint256"},{"name":"voters","type":"address[]","internalType":"address[]"}]},{"name":"vote","type":"bool","internalType":"bool"},{"name":"signature","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"event","name":"ClaimResponded","inputs":[{"name":"operator","type":"address","indexed":true,"internalType":"address"},{"name":"claimId","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"claimCreatedBlock","type":"uint32","indexed":false,"internalType":"uint32"}],"anonymous":false},{"type":"event","name":"NewClaim","inputs":[{"name":"claimId","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"claimCreatedBlock","type":"uint32","indexed":false,"internalType":"uint32"}],"anonymous":false},{"type":"error","name":"Already_Voted","inputs":[]},{"type":"error","name":"Invalid_Claim","inputs":[]},{"type":"error","name":"Invalid_Sender","inputs":[]},{"type":"error","name":"Not_Delegated","inputs":[]},{"type":"error","name":"Not_Operator","inputs":[]},{"type":"error","name":"Reached_Deadline","inputs":[]},{"type":"error","name":"Voting_Ongoing","inputs":[]}]
  const contract = new ethers.Contract(contractAddress, abi, signer);

  await contract.registerOperatorToAVS(
    signer.getAddress(),
    {
      signature: "0x",
      salt: "0x",
      expiry: 0,
    }
  );
}

const NewButtons = () => {
  return (
    <div>
      <Link to="/register">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm hover:scale-105 transition-transform button1">
          Register
        </button> 
      </Link>
      
        <button className="bg-green-500 text-white px-6 py-2 rounded-full text-sm hover:scale-105 transition-transform button2" onClick={becomeValidator}>
          Become a Validator
        </button>

    </div>
  );
};

export default NewButtons;
