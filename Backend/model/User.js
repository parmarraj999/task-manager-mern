const mongoose = require("mongoose");

const UserSignSchema = new mongoose.Schema({
    uid:{
        type:String,
        unique:true,
        trim:true,
    },
    name : String,
    email: String,
    password:String,
    confirmPassword:String
})

const UserSignModel = mongoose.model("user-data",UserSignSchema);
module.exports = UserSignModel;