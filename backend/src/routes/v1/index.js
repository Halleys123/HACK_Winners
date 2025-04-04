const express = require('express');

const { InfoController } = require('../../controllers');
const user =require("./userRoute")
const tender=require("./tenderRoute")
const bid=require("./bidRoute")

const router = express.Router();

router.get('/info', InfoController.info);
router.use('/user',user)
router.use("/tender",tender)
router.use("/bid",bid)

module.exports = router;