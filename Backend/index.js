const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const TaskModel = require("./model/Task");
const UserSignModel = require("./model/User");
const uuid = require("uuid")

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://rajraja5122:Forget5122@taskmanagercluster.z5xcv8a.mongodb.net/tm-data")

app.post("/add",(req,res)=>{
    const task = req.body.task;
    const day = req.body.day;
    const date = req.body.date;
    const time = req.body.time;
    const uid = req.body.userId
    TaskModel.create({
        task : task,
        date : date,
        day : day,
        time : time,
        userId: uid,
    })
})  

app.get("/get/:id",(req,res)=>{
    const {id} = req.params;
    TaskModel.find({ userId : id})
    .then(result=> res.json(result))
    .catch(error => res.json(error))
})

app.delete("/delete/:id",(req,res)=>{
    const {id} = req.params;
    TaskModel.findByIdAndDelete({_id:id})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.put("/done/:id",(req,res)=>{
    const {id} = req.params;
    TaskModel.findByIdAndUpdate({_id:id},{done: true})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})
app.put("/notdone/:id",(req,res)=>{
    const {id} = req.params;
    TaskModel.findByIdAndUpdate({_id:id},{done: false})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.put("/edit/:id",(req,res)=>{
    const {id} = req.params;
    const newTask = req.body.newTask;
    TaskModel.findByIdAndUpdate({_id:id},{task : newTask})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.post("/signup",(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const uid = req.body.uid
    UserSignModel.create({
        uid:uid,
        name:name,
        email:email,
        password:password,
        confirmPassword:confirmPassword
    })
})

app.post("/login",(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    UserSignModel.findOne({email:email})
    .then((user)=>{
        if(user){
            res.json(user);
            // if(user.password === password){
            //     res.json("successfull");
            // }
            // else{
            //     res.json("password is incorrect")
            // }
        }else{
            res.json("No user Found !")
        }
    })
    .catch((err)=>{
        console.log(err)
    })
})


app.listen(4000,()=>{
    console.log("server running on port 4000")
})