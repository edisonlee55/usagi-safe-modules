// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {SafeModule} from "./base/SafeModule.sol";

contract Council is Ownable, SafeModule {
    constructor(
        address initialOwner,
        address _safeAccount
    ) Ownable(initialOwner) SafeModule(_safeAccount) {}

    function send(
        address to,
        uint256 value
    ) external onlyOwner returns (bool success) {
        return execTransactionFromModule(to, value, "0x", 0);
    }
}
