// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract AuditContract {
    struct AuditLog {
        uint id;
        address entity;
        string action;
        uint timestamp;
        string proofHash;
    }

    uint public logCount = 0;
    mapping(uint => AuditLog) public logs;

    event LogCreated(uint logId, address entity, string action, uint timestamp, string proofHash);
    event SuspiciousActivityFlagged(uint logId, string reason);

    function logTransaction(address _entity, string memory _action, string memory _proofHash) public {
        logCount++;
        logs[logCount] = AuditLog(logCount, _entity, _action, block.timestamp, _proofHash);
        emit LogCreated(logCount, _entity, _action, block.timestamp, _proofHash);
    }

    function auditTransactions(uint _logId) public view returns (AuditLog memory) {
        return logs[_logId];
    }

    function flagSuspiciousActivity(uint _logId, string memory _reason) public {
        emit SuspiciousActivityFlagged(_logId, _reason);
    }
}
