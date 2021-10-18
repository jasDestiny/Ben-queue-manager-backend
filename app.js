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
app.post("/users/buytokens", require("./controllers/users/buytokens"));
app.post("/users/vq/findPosition", require("./controllers/vqueue/getposition"));
app.post("/users/vq/entervq", require("./controllers/vqueue/entervq"));
app.post("/users/vq/exitvq", require("./controllers/vqueue/exitvq"));
app.post("/users/serviceproviders/new", require("./controllers/vqueue/createserviceprovider"));
app.post("/users/serviceproviders/findvq", require("./controllers/vqueue/finvq"));

app.listen(port, ()=>console.log(`App is running on port ${port}`)); 