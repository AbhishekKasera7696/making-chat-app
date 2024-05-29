const UserModel = require("../config/models/UserModel");
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
require('dotenv').config();


async function checkPassword(req,res){
   try {
       const {password, userId} = req.body;
       const user = await UserModel.findById(userId);
       const verifyPassword = await bcryptjs.compare(password,user.password);

      if(!verifyPassword){
        return response.status(400).json({
            message: "enter valid password",
            error: true
        })
      }
      
      const tokenData = {
        id: user._id,
        email: user.email
      }
      const token = await jwt.sign(tokenData,  process.env.JWT_SECRET_KEY, {expiresIn : "1d"})


      const cookieOption = {
        http : true,
        secure: true
      }
       return res.cookie('token', token, cookieOption).status(200).json({
            message: "login successfully",
            token: token,
            success: true
       })

   } catch (error) {
      res.status(500).json({
        message: error.message || error,
        error: true
      })
   }
}

module.exports = checkPassword