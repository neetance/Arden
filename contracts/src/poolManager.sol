// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {SentinelPool} from "./pool.sol";

contract PoolManager {
    // errors
    error Value_Zero();
    error Withdraw_Amount_Zero();
    error Withdraw_Amount_Exceeds_Balance();
    error Forbidden_Sender();

    // events
    event LiquidityAdded(address indexed user, uint256 amount);
    event LiquidityWithdrawn(address indexed user, uint256 amount);

    // state variables
    SentinelPool pool;
    address public immutable core;

    // constructor
    constructor(address poolAddr, address coreAddr) {
        pool = SentinelPool(poolAddr);
        core = coreAddr;
    }

    // functions

    /**
     * @dev Adds liquidity to the pool, and mints lp tokens to the sender.
     * NOTE: The msg.value must be greater than zero.
     */
    function addLiquidity() external payable {
        if (msg.value == 0) revert Value_Zero();
        uint256 amount = msg.value;
        (bool success, ) = address(pool).call{value: amount}("");
        require(success, "Transfer failed");
        pool.mint(msg.sender, amount);

        emit LiquidityAdded(msg.sender, amount);
    }

    /**
     * @dev Withdraws liquidity from the pool, and burns lp tokens from the sender.
     * @param amount The amount of tokens to withdraw.
     * NOTE: The amount must be greater than zero and less than or equal to the user's balance.
     */
    function withdrawLiquidity(uint256 amount) external {
        if (amount == 0) revert Withdraw_Amount_Zero();
        if (amount > pool.balanceOf(msg.sender))
            revert Withdraw_Amount_Exceeds_Balance();

        uint256 price = (getTotalLiquidity() * 1e18) / pool.totalSupply();
        uint256 withdrawAmount = (amount * price) / 1e18;
        pool.burn(msg.sender, amount);
        pool.transferETH(msg.sender, withdrawAmount);

        emit LiquidityWithdrawn(msg.sender, withdrawAmount);
    }

    /**
     * @dev Transfers ETH from the pool to the specified address.
     * @param to The address to transfer ETH to.
     * @param amount The amount of ETH to transfer.
     * NOTE: Can only be called by the core contract.
     */
    function makePayout(address to, uint256 amount) external {
        if (msg.sender != core) revert Forbidden_Sender();
        if (amount == 0) revert Withdraw_Amount_Zero();
        if (amount > pool.balanceOf(address(this)))
            revert Withdraw_Amount_Exceeds_Balance();

        pool.transferETH(to, amount);
    }

    /**
     * @dev Returns the total liquidity in the pool.
     * @return The total liquidity in the pool.
     */
    function getTotalLiquidity() public view returns (uint256) {
        return address(this).balance;
    }
}
