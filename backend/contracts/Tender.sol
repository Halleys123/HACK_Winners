// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TenderBidAudit {
    /// @notice Emitted when a new tender is created
    /// @param tenderId    Your internal tender identifier
    /// @param creator     The gov‑admin address
    /// @param tenderHash  keccak256 hash of the full tender JSON
    /// @param timestamp   Block timestamp of creation
    event TenderCreated(
        uint indexed tenderId,
        address indexed creator,
        bytes32 tenderHash,
        uint    timestamp
    );

    /// @notice Emitted when a contractor submits a bid
    /// @param tenderId  The tender being bid on
    /// @param bidder    The contractor’s address
    /// @param bidHash   keccak256 hash of the bid details JSON
    /// @param timestamp Block timestamp of bid
    event BidSubmitted(
        uint indexed tenderId,
        address indexed bidder,
        bytes32 bidHash,
        uint    timestamp
    );

    /// @notice Emitted when a tender is awarded
    /// @param tenderId        The tender that’s been approved
    /// @param winner          Winning contractor address
    /// @param approvedBidHash Hash of the winning bid JSON
    /// @param timestamp       Block timestamp of approval
    event TenderApproved(
        uint indexed tenderId,
        address indexed winner,
        bytes32 approvedBidHash,
        uint    timestamp
    );

    /// @notice Emitted when an auditor flags a tender
    /// @param tenderId      The tender being flagged
    /// @param auditor       Auditor’s address
    /// @param reasonHash    keccak256 hash of the audit report summary
    /// @param timestamp     Block timestamp of flag
    event AuditFlagged(
        uint indexed tenderId,
        address indexed auditor,
        bytes32 reasonHash,
        uint    timestamp
    );

    /// @notice Gov‑admin calls this right after writing tender to your DB
    function createTender(uint tenderId, bytes32 tenderHash) external {
        emit TenderCreated(tenderId, msg.sender, tenderHash, block.timestamp);
    }

    /// @notice Contractor calls this after saving bid off‑chain
    function submitBid(uint tenderId, bytes32 bidHash) external {
        emit BidSubmitted(tenderId, msg.sender, bidHash, block.timestamp);
    }

    /// @notice Gov‑admin locks in the winner on‑chain
    function approveTender(
        uint tenderId,
        address winner,
        bytes32 approvedBidHash
    ) external {
        emit TenderApproved(tenderId, winner, approvedBidHash, block.timestamp);
    }

    /// @notice Auditor flags a suspicious tender
    function flagTender(uint tenderId, bytes32 reasonHash) external {
        emit AuditFlagged(tenderId, msg.sender, reasonHash, block.timestamp);
    }
}
