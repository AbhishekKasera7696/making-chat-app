async function logOut(req,res){
    try {
        const cookieOption = {
            http : true,
            secure: true
          }
          return res.cookie('token','',cookieOption).status(200).json({
            message: "logout succesfully",
            success: true
          })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

module.exports = logOut