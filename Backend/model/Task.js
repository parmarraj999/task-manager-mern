const mongoose = require("mongoose");



const TaskSchema = new mongoose.Schema({
    task: String,
    date : String,
    time:String,
    day : String,
    done : {
        type: Boolean,
        default: false
    }
})

const TaskModel = mongoose.model("tm-data",TaskSchema);
module.exports = TaskModel;