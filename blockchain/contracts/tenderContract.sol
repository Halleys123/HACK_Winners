// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TenderContract {
    struct Tender {
        uint id;
        string description;
        uint amount;
        uint deadline;
        address contractor;
        bool isApproved;
    }

    address public government;
    uint public tenderCount = 0;
    mapping(uint => Tender) public tenders;

    modifier onlyGovernment() {
        require(msg.sender == government, "Not authorized");
        _;
    }

    event TenderCreated(uint tenderId, string description, uint amount, uint deadline);
    event TenderApproved(uint tenderId, address contractor);

    constructor() {
        government = msg.sender; // Government is contract deployer
    }

    function createTender(string memory _description, uint _amount, uint _deadline) public onlyGovernment {
        tenderCount++;
        tenders[tenderCount] = Tender(tenderCount, _description, _amount, _deadline, address(0), false);
        emit TenderCreated(tenderCount, _description, _amount, _deadline);
    }

    function approveTender(uint _tenderId, address _contractor) public onlyGovernment {
        require(tenders[_tenderId].id != 0, "Tender does not exist");
        require(!tenders[_tenderId].isApproved, "Already approved");
        tenders[_tenderId].contractor = _contractor;
        tenders[_tenderId].isApproved = true;
        emit TenderApproved(_tenderId, _contractor);
    }

    function getTender(uint _tenderId) public view returns (Tender memory) {
        return tenders[_tenderId];
    }
}
