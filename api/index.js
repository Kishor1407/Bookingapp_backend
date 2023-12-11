const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const rooms = require("./routes/rooms.js");
const users = require("./routes/users.js");
const hotels = require("./routes/hotels.js");
const auth = require("./routes/auth.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
});

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
});

app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define your routes
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/hotels", hotels);
app.use("/api/rooms", rooms);

app.get("/users", (req, res) => {
    res.send("Hello first request");
});

// Error handling middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(port, () => {
    connect();
    console.log("Connected to backend");
});




















































// const express = require("express");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// // import dotenv from "dotenv";
// // import mongoose from "mongoose";
// // const bodyParser = require("body-parser");
// const rooms =require("./routes/rooms.js")
// const users =require("./routes/users.js")
// const hotels =require("./routes/hotels.js")
// const auth =require("./routes/auth.js")
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const app=express();
// const port=3000;
// app.use(cookieParser());
// app.use(cors());
// dotenv.config();
// const connect = async () => {
//     try{ 
//         await mongoose.connect(process.env.MONGO);
//         console.log("connected to mongodb")
//     } catch(error){
//         // console.error("An error:",error);
//         throw error;
//     }
// };
// mongoose.connection.on("disconnected",()=>{
//     console.log("mongodb disconnected")
// })
// mongoose.connection.on("connected",()=>{
//     console.log("mongodb connected")
// })
// app.use(bodyParser.json()) // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true }))

// const morgan = require("morgan")
// const helmet = require("helmet");
// app.use("/api/auth", auth);
// app.use("/api/users", users);
// app.use("/api/hotels", hotels);
// app.use("/api/rooms", rooms);

// app.use(helmet());
// app.use(morgan("common"));
// app.use(express.json());


// app.get("/users",(req,res)=>{
//     res.send("Hello first request")
// })

// // middleware
// app.use((err,req,res,next)=>{

//     const errorStatus = err.status || 500;
//     const errorMessage =err.message || "Something went wrong!";
//     return res.status(errorStatus).json({
//         success:false,
//         status:errorStatus,
//         message:errorMessage,
//         stack: err.stack,
//     })
//     // console.log("middlewareeeeeee")
//     // res.send("hello middleware")
//     // next()
// })

// app.listen(port, ()=>{
//     connect();
//     console.log("Connected to backendddddd")
// }) ;



// // yourmodule.js

// // module.exports.createError = (status, message) => {
// //     const error = new Error(message);
// //     error.status = status;
// //     return error;
// // };
