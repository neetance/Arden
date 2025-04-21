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
        (bool success, ) = address(pool).call{value: amount}("");
        require(success, "Transfer failed");
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
        pool.transferETH(msg.sender, withdrawAmount);

        emit LiquidityWithdrawn(msg.sender, withdrawAmount);
    }

    function getTotalLiquidity() public view returns (uint256) {
        return address(this).balance;
    }
}
