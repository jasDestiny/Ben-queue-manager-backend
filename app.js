require('dotenv').config();
const express=require("express");
const app=express();
const port= process.env.PORT || 4040;
const bodyParser=require("body-parser");
const mongoose= require("./config/MongooseConnect")
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.get("/", require("./controllers/home/welcomehome"));
app.post("/users/login", require("./controllers/auth/login"));   
app.post("/users/signup", require("./controllers/auth/signup"));   

app.listen(port, ()=>console.log(`App is running on port ${port}`)); 