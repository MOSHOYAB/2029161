const express = require("express");
const router = express.Router();

const {auth, register,trains} = require("../Controllers/Auth");

 const trainController = require('../Controllers/trainController');

 router.get('/trains', trainController.getTrains);

router.post("/auth",auth);
router.post("/register", register);
router.get("/trains",trains);




module.exports = router;