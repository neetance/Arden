// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {SentinelPool} from "./pool.sol";

contract PoolManager {
    error Value_Zero();
    error Withdraw_Amount_Zero();
    error Withdraw_Amount_Exceeds_Balance();

    event LiquidityAdded(address indexed user, uint256 amount);
    event LiquidityWithdrawn(address indexed user, uint256 amount);

    SentinelPool pool;

    constructor(address poolAddr) {
        pool = SentinelPool(poolAddr);
    }

    function addLiquidity() external payable {
        if (msg.value == 0) revert Value_Zero();
        uint256 amount = msg.value;

        pool.mint(msg.sender, amount);
        emit LiquidityAdded(msg.sender, amount);
    }

    function withdrawLiquidity(uint256 amount) external {
        if (amount == 0) revert Withdraw_Amount_Zero();
        if (amount > pool.balanceOf(msg.sender))
            revert Withdraw_Amount_Exceeds_Balance();

        uint256 price = (getTotalLiquidity() * 1e18) / pool.totalSupply();
        uint256 withdrawAmount = (amount * price) / 1e18;
        pool.burn(msg.sender, amount);
        (bool success, ) = msg.sender.call{value: withdrawAmount}("");
        require(success, "Transfer failed");

        emit LiquidityWithdrawn(msg.sender, withdrawAmount);
    }

    function getTotalLiquidity() public view returns (uint256) {
        return address(this).balance;
    }
}
