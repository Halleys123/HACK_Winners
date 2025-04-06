const express = require('express');
const { swaggerUi, swaggerSpec } = require('./swagger');
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const cors = require('cors');
const {
    deployContract,
    setExistingContract,
    getWeb3Data,
  } = require("./web3Service");
  const {abi}=require("../compile")


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', apiRoutes);


app.listen(ServerConfig.PORT, async () => {
    if (ServerConfig.CONTRACT_ADDRESS) {
      await setExistingContract(ServerConfig.CONTRACT_ADDRESS);
    } else {
      await deployContract();
    }
  
    const { contract } = getWeb3Data();
    console.log("Server started. Contract at:", contract.options.address);
    console.log(`Listening on port ${ServerConfig.PORT}`);
  });