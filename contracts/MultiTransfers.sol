// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.1;

import "./OaxisToken.sol";

contract MultiTransfers {
    // function multiTransfers(
    //     address[] memory tokens,
    //     address[] memory _sender,
    //     address[] memory _receiver,
    //     uint256[] memory _amounts
    // ) public {
    //     for (uint256 i = 0; i < _receiver.length; i++) {
    //         ERC20(tokens[i]).transfer2(_sender[i], _receiver[i], _amounts[i]);
    //     }
    // }

    function multiTransfers(
        address[] memory tokens,
        address[] memory _sender,
        address[] memory _receiver,
        uint256[] memory _amounts
    ) public {
        for (uint256 i = 0; i < _receiver.length; i++) {
            OaxisToken(tokens[i]).transfer2(
                _sender[i],
                _receiver[i],
                _amounts[i]
            );
        }
    }
}
