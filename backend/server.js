import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js'; 
import Task from './model/product.model.js';
import mongoose from 'mongoose';


dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json()); // allows us to accept Json data in the body 
app.use(cors({
    origin: "http://localhost:5173", // Change to your frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  }));


app.get('/', async (req,res) => {
    try {
        const tasks = await Task.find({});
        res.status(201).json({success:true,data:tasks});
    } catch (error) {
        console.error("error in fetching data",error.message);
        res.status(500).json({success:false,message:"Server problem"});
    }
    
})

app.post('/', async (req , res)=>{
    const task = req.body

    const newTask = new Task(task);

    try {
        await newTask.save();
        res.status(201).json({success:true,data: newTask});
    } catch (error) {
        console.log("error in create task",error.message);
        res.status(500).json({success:false,message:"Server Problem"})
    }
})

app.put('/:id', async (req , res)=>{
    const {id} = req.params;
    const task = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success:false,message:"Invalid Task Id"})
    }

    try {
        const updateTask = await Task.findByIdAndUpdate(id,task,{new:true});
        res.status(201).json({success:true,data: updateTask });
    } catch (error) {
        console.log("error in create task",error.message);
        res.status(500).json({success:false,message:"Server Error"})
    }
})

app.delete('/:id',async (req,res) => {
    const {id} = req.params;

    try {
        await Task.findByIdAndDelete(id);
        res.status(201).json({success:true,message:" Task Deleted "});
    } catch (error) {
        console.error("error in delete task",error.message);
        res.status(404).json({success:false,message:"Task not found"})
    }
})

app.listen(PORT,()=>{
    connectDB();
    console.log(`server running at port ${PORT}`);
    
})