// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {SafeModule} from "./SafeModule.sol";

contract Council is SafeModule {
    constructor(
        address initialOwner,
        address _safeAccount
    ) SafeModule(initialOwner, _safeAccount) {}

    function send(
        address to,
        uint256 value
    ) external onlyOwner returns (bool success) {
        return execTransactionFromModule(to, value, "0x", 0);
    }
}
