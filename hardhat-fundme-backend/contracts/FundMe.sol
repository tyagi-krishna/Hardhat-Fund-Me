// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract FundMe {
    address[] public funders;
    address reciever;
    uint256 amount;
    mapping(address => uint256) public amountFunded;

    function fund() public payable {
        require(msg.value > 50, "Didn't send enough");
        funders.push(msg.sender);
        amountFunded[msg.sender] = msg.value;
    }

    function withdraw() public {
        for (
            uint256 FundersIndex = 0;
            FundersIndex < funders.length;
            FundersIndex = FundersIndex + 1
        ) {
            address funder = funders[FundersIndex];
            amountFunded[funder] = 0;
        }
        funders = new address[](0);

        // transfer:   payable(msg.sender).transfer(address(this).balance);

        //send: bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSucess, "Failed");

        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "call Failed");
    }
}
