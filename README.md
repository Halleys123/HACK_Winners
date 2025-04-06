# Corruption-Free Contracts: A Transparent Tender Management System

> **Tagline:** _Powering a corruption-free and transparent government procurement system using blockchain._

## Overview

India’s public procurement process, especially in infrastructure and logistics, often suffers from corruption, lack of transparency, and bid manipulation. Our project leverages **blockchain technology** to build a transparent, tamper-proof, and auditable system for managing government tenders.

Through a decentralized tendering and bidding mechanism, we ensure **fairness**, **traceability**, and **efficiency** while minimizing fraudulent practices. The system brings together government officials, contractors, suppliers, and auditors into a transparent ecosystem where data integrity and accountability are paramount.

---

## Problem Statement

Public procurement in India—especially for infrastructure projects—has long been plagued with **corruption**, **bid rigging**, **fake documentation**, and **lack of real-time transparency**. Contractors often exploit loopholes in the manual tendering process, submitting fake invoices, using substandard materials, and winning tenders through favoritism rather than fair competition.

Our project addresses this by offering a **decentralized and auditable tender system** using blockchain. From **tender launch**, **bid submission**, **material purchase tracking**, to **audits**, everything is stored immutably, ensuring **public visibility** and **unmatched trust** in every stage of the procurement lifecycle.

---

## How It Works

### Roles

- **Government Admin**: Launches tenders, verifies bids, and monitors procurement.
- **Contractor**: Bids for tenders and procures goods from registered suppliers.
- **Supplier**: Provides proof of legitimate material purchases to the blockchain.
- **Transporter**: Manages shipment information tied to a tender.
- **Auditor (NGO/3rd Party)**: Audits on-chain proof for compliance and red flags.

### Tech Stack

- **Frontend**: React.js with Aceternity UI components for rapid prototyping.
- **Backend**: Node.js & Express for API routing and Web3 integration.
- **Blockchain**: Ethereum + Solidity Smart Contracts.
- **Dev Tools**: Hardhat, Ethers/Web3.js, Ganache for local testing.
- **Deployment**: GitHub Actions, dotenv, and Hardhat deployment scripts.

---

## What’s Stored on Blockchain?

- Tender creation metadata (tender ID, purpose, value, dates).
- Contractor bid hash and submission timestamp.
- Approved bid hash (when selected).
- Supplier material hashes or receipts.
- Auditor flags or comments.

⛓️ We **emit events** and store **minimal hashes** to keep the blockchain usage lightweight while storing detailed tender data in our off-chain backend.

---

## Frontend Pages

### Government

- `/launch-tender`: Create a new tender.
- `/all-tenders`: List all existing tenders.
- `/tender/:id`: View tender & audit details.

### Contractor

- `/bid/:id`: Submit bid to a tender.
- `/my-bids`: View your previous bids.

### Supplier & Public

- `/tender/:id`: View public details (material status, audit, etc.)

---

## How This Fits Blockchain Track

- Demonstrates real-world use of smart contracts to eliminate procurement fraud.
- Uses Ethereum & Solidity for verifiable, tamper-proof data recording.
- Shows gas-efficient smart contract design using events over storage.
- Easily extendable to L2 chains or permissioned chains for scale.

---

## How This Fits GitHub Innovators Track

- Fully open-source & transparent codebase on GitHub.
- GitHub Actions for smart contract linting, testing, and deployment.
- Discussions & Issues enabled for community collaboration.
- Dependabot for dependency management and security alerts.

---

## Challenges We Faced

- Designing modular yet gas-efficient smart contracts.
- Managing identity across different user roles securely.
- Integrating blockchain into a user-friendly React frontend.
- Understanding Solidity nuances and debugging contract logic.
- Keeping the app lightweight enough for hackathon time constraints.

---

## Cover Image

![Cover](./A_2D_digital_vector_illustration_serves_as_a_cover.png)

---

## Contributing

1. Clone the repo
2. Run `npm install` in `/client` and `/server`
3. Spin up Ganache or local Ethereum network
4. Use Hardhat to compile and deploy contracts
5. Submit a pull request 🚀

---

## License

MIT License © 2025 Hackathon Team

https://dbdiagram.io/d/67f20b144f7afba1847e47f9
