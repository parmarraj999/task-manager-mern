const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const TaskModel = require("./model/Task");
const UserSignModel = require("./model/User");
const uuid = require("uuid")

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/tm-data")

app.post("/add",(req,res)=>{
    const task = req.body.task;
    const day = req.body.day;
    const date = req.body.date;
    const time = req.body.time;
    TaskModel.create({
        task : task,
        date : date,
        day : day,
        time : time,
    })
})  

app.get("/get",(req,res)=>{
    TaskModel.find()
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

// app.post("/login",(req,res)=>{
//     const email = req.body.email;
//     const password = req.body.password;
//     UserSignModel.create({
//         email:email,
//         password:password
//     })
// })

app.listen(4000,()=>{
    console.log("server running on port 4000")
})