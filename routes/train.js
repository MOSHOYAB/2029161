
const express = require('express');
const router = express.Router();

const {trainController} = require('../Controllers/trainController');


router.get('/trains', trainController);

module.exports = router;
