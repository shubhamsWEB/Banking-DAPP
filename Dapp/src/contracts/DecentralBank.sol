// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.5.0;

import "./RWD.sol";
import "./TestCoin.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    TestCoin public testCoin;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(RWD _rwd, TestCoin _testCoin) public {
        rwd = _rwd;
        testCoin = _testCoin;
        owner = msg.sender;
    }

    function depositTokens(uint256 _amount) public {
        require(_amount > 0, "amount cannot be 0");
        testCoin.transferFrom(msg.sender, address(this), _amount);

        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    function unstakeTokens() public {
        uint256 balance = stakingBalance[msg.sender];
        require(balance > 0, "staking balance cannot be less than zero");

        testCoin.transfer(msg.sender, balance);

        stakingBalance[msg.sender] = 0;

        isStaking[msg.sender] = false;
    }

    function issueTokens() public {
        require(msg.sender == owner, "caller must be owner");

        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient] / 9;
            if (balance > 0) {
                rwd.transfer(recipient, balance);
            }
        }
    }
}
