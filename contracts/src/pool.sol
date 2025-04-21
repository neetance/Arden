// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract SentinelPool is ERC20, Ownable {
    error Insufficient_Balance(uint256 amount);

    constructor() ERC20("Sentinel", "SNT") Ownable(msg.sender) {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }

    function transferETH(address to, uint256 amount) external onlyOwner {
        if (address(this).balance < amount) revert Insufficient_Balance(amount);

        (bool success, ) = to.call{value: amount}("");
        require(success, "Transfer failed");
    }
}
