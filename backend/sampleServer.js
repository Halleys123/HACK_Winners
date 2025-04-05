// index.js
require('dotenv').config();
const express = require('express');
const Web3 = require('web3');
const fs = require('fs');
const { abi, bytecode } = require('./compile'); // compile.js exports your TenderBidAudit ABI & bytecode

const app = express();
app.use(express.json());

const web3 = new Web3(process.env.RPC_URL);
let contract;
let accounts;

// Deploy the contract and write its address to .env
const deployContract = async () => {
  accounts = await web3.eth.getAccounts();
  console.log('Deploying contract from:', accounts[0]);

  contract = await new web3.eth.Contract(abi).deploy({ data: bytecode }).send({
    from: accounts[0],
    gas: '5000000',
    gasPrice: '20000000000',
  });

  console.log('Contract deployed at:', contract.options.address);

  // Persist contract address for later use
  fs.writeFileSync(
    '.env',
    `RPC_URL=${process.env.RPC_URL}\nCONTRACT_ADDRESS=${contract.options.address}\n`
  );
};

// Middleware to ensure contract is ready
app.use(async (req, res, next) => {
  if (!contract) {
    // If we've already deployed once, just attach
    if (process.env.CONTRACT_ADDRESS) {
      contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);
      accounts = await web3.eth.getAccounts();
      return next();
    }
    // Otherwise deploy now
    await deployContract();
  }
  next();
});

// 1. Create Tender
app.post('/tender/create', async (req, res) => {
  try {
    const { tenderId, tenderHash } = req.body;
    await contract.methods
      .createTender(tenderId, tenderHash)
      .send({ from: accounts[0] });
    res.send({ status: 'TenderCreated', tenderId, tenderHash });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// 2. Submit Bid
app.post('/bid/submit', async (req, res) => {
  try {
    const { tenderId, bidHash } = req.body;
    // assume contractor uses accounts[1]
    await contract.methods
      .submitBid(tenderId, bidHash)
      .send({ from: accounts[1] });
    res.send({ status: 'BidSubmitted', tenderId, bidHash });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// 3. Approve Tender
app.post('/tender/approve', async (req, res) => {
  try {
    const { tenderId, winner, approvedBidHash } = req.body;
    await contract.methods
      .approveTender(tenderId, winner, approvedBidHash)
      .send({ from: accounts[0] });
    res.send({ status: 'TenderApproved', tenderId, winner, approvedBidHash });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// 4. Flag Audit
app.post('/audit/flag', async (req, res) => {
  try {
    const { tenderId, reasonHash } = req.body;
    // assume auditor uses accounts[2]
    await contract.methods
      .flagTender(tenderId, reasonHash)
      .send({ from: accounts[2] });
    res.send({ status: 'AuditFlagged', tenderId, reasonHash });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// (Optional) Fetch past events for a tender
app.get('/events/:type/:tenderId', async (req, res) => {
  try {
    const { type, tenderId } = req.params;
    const events = await contract.getPastEvents(type, {
      filter: { tenderId: Number(tenderId) },
      fromBlock: 0,
      toBlock: 'latest',
    });
    res.send(events);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
