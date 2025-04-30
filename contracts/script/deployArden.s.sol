// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {ArdenCore} from "../src/ardenCore.sol";
import {ArdenNFT} from "../src/ardenNFT.sol";
import {PoolManager} from "../src/poolManager.sol";
import {ArdenPool} from "../src/pool.sol";
import {MyServiceManager} from "../src/avs/AVSManager.sol";

contract DeployArden is Script {
    ArdenCore public core;
    ArdenNFT public nft;
    PoolManager public poolManager;
    ArdenPool public pool;
    MyServiceManager public avsManager;

    address public avsDirectoryAddr =
        0x69346b77C6bCf3B0bb50749Dff3086695A775A8B;
    address public delegationManagerAddr =
        0x94039Ce3c372eFEf4e6D7bB95C8A06BdC9bcE19A;

    function run()
        external
        returns (ArdenCore, ArdenNFT, PoolManager, ArdenPool, MyServiceManager)
    {
        vm.startBroadcast();
        pool = new ArdenPool();
        avsManager = new MyServiceManager(
            avsDirectoryAddr,
            delegationManagerAddr
        );
        nft = new ArdenNFT(address(pool));
        poolManager = new PoolManager(address(pool));
        core = new ArdenCore(
            address(avsManager),
            address(poolManager),
            address(nft)
        );

        poolManager.setCore(address(core));
        nft.setCore(address(core));

        vm.stopBroadcast();
        return (core, nft, poolManager, pool, avsManager);
    }
}
