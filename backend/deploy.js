const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { abi, bytecode } = require('./compile');
const dotenv = require('dotenv');

dotenv.config();

const provider = new HDWalletProvider(
  process.env.MNEMONIC,
  process.env.RPC_URL
);

const web3 = new Web3(provider);

async function deploy() {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode, arguments: ['Initial message'] })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Deployed at: ', result.options.address);
  provider.engine.stop();
}

deploy();
