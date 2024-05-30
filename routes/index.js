const express = require("express");
const registerUser = require("../controller/resgitserUser");
const checkEmail = require("../controller/checkEmail");
const checkPassword = require("../controller/checkPassword");
const userDetail = require("../controller/userDetail");
const logOut = require("../controller/logOut");
const updateUserDetail = require("../controller/updateUserDetail");

const router = express.Router();

//creating user api
router.post('/register', registerUser);

//checking email;
router.post("/email", checkEmail);

//check user password;
router.post("/password", checkPassword);

//login user-details;
router.get("/user-detail", userDetail);

//logout user;
router.get("/logout", logOut);

//update-user;
router.post("/update-user", updateUserDetail);

module.exports = router;