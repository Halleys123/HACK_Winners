const HDWalletProvider = require('@truffle/hdwallet-provider');
const {Web3} = require("web3");
const { abi, bytecode } = require("../compile"); 
const { ServerConfig } = require("../src/config");

const provider = new HDWalletProvider(
    process.env.MNEMONIC,
   ServerConfig.RPC_URL
  );

  let web3 = new Web3(provider);
  let contract = null;
  let accounts = null;


  const setExistingContract = async (contractAddress) => {
    contract = new web3.eth.Contract(abi, contractAddress);
    accounts = await web3.eth.getAccounts();
    console.log("Using existing contract at:", contractAddress);
  };
  
  const getWeb3Data = () => ({
    web3,
    contract,
    accounts
  });
  

const deployContract = async () => {
  accounts = await web3.eth.getAccounts();
  console.log('Deploying contract from:',accounts[0]);

  contract = await new web3.eth.Contract(abi).deploy({ data: bytecode }).send({
    from: accounts[0],
    gas: '5000000',
    gasPrice: '20000000000',
  });

  console.log('Contract deployed at:', contract.options.address);

};




module.exports = {
    deployContract,
    setExistingContract,
    getWeb3Data
};

