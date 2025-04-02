// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TransportationContract {
    struct Transport {
        uint id;
        uint orderId;
        address transporter;
        address warehouse;
        string transportProofHash;
        bool isDelivered;
    }

    uint public transportCount = 0;
    mapping(uint => Transport) public transports;

    event TransportAssigned(uint transportId, uint orderId, address transporter, address warehouse);
    event TransportConfirmed(uint transportId, string transportProofHash);

    function assignTransport(uint _orderId, address _transporter, address _warehouse) public {
        transportCount++;
        transports[transportCount] = Transport(transportCount, _orderId, _transporter, _warehouse, "", false);
        emit TransportAssigned(transportCount, _orderId, _transporter, _warehouse);
    }

    function confirmDelivery(uint _transportId, string memory _transportProofHash) public {
        require(transports[_transportId].warehouse == msg.sender, "Not authorized");
        require(!transports[_transportId].isDelivered, "Already delivered");
        transports[_transportId].transportProofHash = _transportProofHash;
        transports[_transportId].isDelivered = true;
        emit TransportConfirmed(_transportId, _transportProofHash);
    }

    function getTransport(uint _transportId) public view returns (Transport memory) {
        return transports[_transportId];
    }
}
