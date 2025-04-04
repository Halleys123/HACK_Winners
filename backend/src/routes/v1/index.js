const express = require('express');

const { InfoController } = require('../../controllers');
const user =require("./user")

const router = express.Router();

router.get('/info', InfoController.info);
router.use('/user',user)

module.exports = router;