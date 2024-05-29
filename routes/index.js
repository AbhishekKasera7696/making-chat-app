const express = require("express");
const registerUser = require("../controller/resgitserUser");
const checkEmail = require("../controller/checkEmail");
const checkPassword = require("../controller/checkPassword");

const router = express.Router();

//creating user api

router.post('/register', registerUser);

//checking email;

router.post("/email", checkEmail);

//check user password;

router.post("/password", checkPassword)

module.exports = router;