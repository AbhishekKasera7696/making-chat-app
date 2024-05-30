const getUserDetailFromToken = require("../helpers/getUserDetailFromToken");
const UserModel = require("../config/models/UserModel");

async function updateUserDetail(req,res){
    try {
        const token = req.cookies.token || "";
        const user = await getUserDetailFromToken(token);
        const {name, email, profile_pic} = req.body;
        const updateUser = await UserModel.updateOne({_id: user._id},{
            name,
            email,
            profile_pic
        })
        const userInformation = await UserModel.findById(user._id);
        return res.status(200).json({
            message: "user detail updated succesfully",
            data: userInformation,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error : true
        })
    }
};
 module.exports = updateUserDetail