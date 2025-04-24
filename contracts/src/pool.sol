// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract SentinelPool is ERC20, Ownable {
    // errors
    error Insufficient_Balance(uint256 amount);

    // constructor
    constructor() ERC20("Sentinel", "SNT") Ownable(msg.sender) {}

    // functions

    /**
     * @dev Mints new tokens to the specified address.
     * @param to The address to mint tokens to.
     * @param amount The amount of tokens to mint.
     * NOTE: Can only be called by the PoolManager contract.
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    /**
     * @dev Burns tokens from the specified address.
     * @param from The address to burn tokens from.
     * @param amount The amount of tokens to burn.
     * NOTE: Can only be called by the PoolManager contract.
     */
    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }

    /**
     * @dev Transfers ETH from the liquidity pool to the specified address.
     * @param to The address to transfer ETH to.
     * @param amount The amount of ETH to transfer.
     * NOTE: Can only be called by the PoolManager contract.
     */
    function transferETH(address to, uint256 amount) external onlyOwner {
        if (address(this).balance < amount) revert Insufficient_Balance(amount);

        (bool success, ) = to.call{value: amount}("");
        require(success, "Transfer failed");
    }
}
