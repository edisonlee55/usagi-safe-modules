// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {ISafe} from "./interfaces/ISafe.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Council is Ownable {
    address public safeAccount;

    constructor(address initialOwner, address _safeAccount) Ownable(initialOwner) {
        safeAccount = _safeAccount;
    }

    function execTransactionFromModule(
        address to,
        uint256 value,
        bytes memory data,
        uint8 operation
    ) external onlyOwner returns (bool success) {
        return
            ISafe(safeAccount).execTransactionFromModule(to, value, data, operation);
    }

    function execTransactionFromModuleReturnData(
        address to,
        uint256 value,
        bytes memory data,
        uint8 operation
    ) external onlyOwner returns (bool success, bytes memory returnData) {
        return
            ISafe(safeAccount).execTransactionFromModuleReturnData(
                to,
                value,
                data,
                operation
            );
    }

    // function checkSignatures(
    //     bytes32 dataHash,
    //     bytes memory data,
    //     bytes memory signatures
    // ) external view {
    //     ISafe(safeAccount).checkSignatures(dataHash, data, signatures);
    // }

    // function domainSeparator() external view returns (bytes32) {
    //     return ISafe(safeAccount).domainSeparator();
    // }

    // function getModulesPaginated(
    //     address start,
    //     uint256 pageSize
    // ) external view returns (address[] memory array, address next) {
    //     return ISafe(safeAccount).getModulesPaginated(start, pageSize);
    // }
}
