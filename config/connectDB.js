const mongoose = require("mongoose");
require('dotenv').config();

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection
        connection.on('connected', ()=>{
            console.log("connected to database")
        })
        connection.on('error', (error)=>{
            console.log("can't connect to database", error)
        })
    } catch (error) {
        console.log("something went wrong", error)
    }
}

module.exports = connectDB