// Updated compile.js (critical fixes marked)
const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Tender.sol');
const inboxSrcCode = fs.readFileSync(inboxPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'Tender.sol': {
      content: inboxSrcCode,
    },
  },
  settings: {
    // optimizer: { enabled: true, runs: 200 }, // Added optimizer
    evmVersion: 'london', // Critical EVM version fix
    outputSelection: {
      '*': {
        '*': ['abi', 'evm.bytecode'],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(output);

// Add error handling first
if (output.errors) {
  throw new Error(`
    Compilation errors:
    ${output.errors.map((err) => err.formattedMessage).join('\n')}
  `);
}

// Correct export structure
module.exports = {
  abi: output.contracts['Tender.sol'].TenderBidAudit.abi,
  bytecode: output.contracts['Tender.sol'].TenderBidAudit.evm.bytecode.object,
};
