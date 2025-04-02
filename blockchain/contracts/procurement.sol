// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ProcurementContract {
    struct Order {
        uint id;
        address contractor;
        address supplier;
        uint amount;
        string itemDetails;
        string proofHash;
        bool isConfirmed;
    }

    uint public orderCount = 0;
    mapping(uint => Order) public orders;

    event OrderPlaced(uint orderId, address contractor, address supplier, uint amount, string itemDetails);
    event OrderConfirmed(uint orderId, string proofHash);

    function placeOrder(address _supplier, uint _amount, string memory _itemDetails) public {
        orderCount++;
        orders[orderCount] = Order(orderCount, msg.sender, _supplier, _amount, _itemDetails, "", false);
        emit OrderPlaced(orderCount, msg.sender, _supplier, _amount, _itemDetails);
    }

    function confirmSupply(uint _orderId, string memory _proofHash) public {
        require(orders[_orderId].supplier == msg.sender, "Not authorized");
        require(!orders[_orderId].isConfirmed, "Already confirmed");
        orders[_orderId].proofHash = _proofHash;
        orders[_orderId].isConfirmed = true;
        emit OrderConfirmed(_orderId, _proofHash);
    }

    function getOrder(uint _orderId) public view returns (Order memory) {
        return orders[_orderId];
    }
}
