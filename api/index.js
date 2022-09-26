import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from "cors";
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import hotelRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import cookieParser from 'cookie-parser';

dotenv.config()
const app = express()
const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to mongodb.");
    }catch(error){
        throw error
    }
}
mongoose.connection.on('connected',()=>{
    console.log("mongoDB connected");
})
mongoose.connection.on('disconnected',()=>{
    console.log("mongoDB disconnected");
})

app.get("/users",(req,res)=>{
    res.send("first request")
})

// middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/hotels', hotelRoute)
app.use('/api/rooms', roomsRoute)

app.use((err,req,res,next)=>{
    const errStatus = err.status || 500
    const errMessage = err.message || "Something went wrong"
   return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack
   })
})


app.listen(5000, ()=>{
    connect()
    console.log("connected to backend");
})