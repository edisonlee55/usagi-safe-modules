// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {ISafe} from "./interfaces/ISafe.sol";

contract SafeModule is Ownable {
    address public safeAccount;

    constructor(
        address initialOwner,
        address _safeAccount
    ) Ownable(initialOwner) {
        safeAccount = _safeAccount;
    }

    function execTransactionFromModule(
        address to,
        uint256 value,
        bytes memory data,
        uint8 operation
    ) internal onlyOwner returns (bool success) {
        return
            ISafe(safeAccount).execTransactionFromModule(
                to,
                value,
                data,
                operation
            );
    }

    function execTransactionFromModuleReturnData(
        address to,
        uint256 value,
        bytes memory data,
        uint8 operation
    ) internal onlyOwner returns (bool success, bytes memory returnData) {
        return
            ISafe(safeAccount).execTransactionFromModuleReturnData(
                to,
                value,
                data,
                operation
            );
    }
}
