// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {ISafe} from "./interfaces/ISafe.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Council is Ownable {
    address public safe;

    constructor(address initialOwner, address _safe) Ownable(initialOwner) {
        safe = _safe;
    }

    function execTransactionFromModule(
        address to,
        uint256 value,
        bytes memory data,
        uint8 operation
    ) external onlyOwner returns (bool success) {
        return
            ISafe(safe).execTransactionFromModule(to, value, data, operation);
    }

    function execTransactionFromModuleReturnData(
        address to,
        uint256 value,
        bytes memory data,
        uint8 operation
    ) external onlyOwner returns (bool success, bytes memory returnData) {
        return
            ISafe(safe).execTransactionFromModuleReturnData(
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
    //     ISafe(safe).checkSignatures(dataHash, data, signatures);
    // }

    // function domainSeparator() external view returns (bytes32) {
    //     return ISafe(safe).domainSeparator();
    // }

    // function getModulesPaginated(
    //     address start,
    //     uint256 pageSize
    // ) external view returns (address[] memory array, address next) {
    //     return ISafe(safe).getModulesPaginated(start, pageSize);
    // }
}
