require('dotenv').config();
const express=require("express");
const app=express();
const port= process.env.PORT || 4040;
const bodyParser=require("body-parser");
const mongoose= require("./config/MongooseConnect")
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//cors
var cors = require('cors');
var corsOptions = {
  origin: '*',
  methods: ["GET", "POST"]
}
app.use(cors());

// routes
app.get("/", require("./controllers/home/welcomehome"));
app.post("/test", require("./controllers/test/test"));
app.post("/users/signup", require("./controllers/auth/signup"));
app.post("/users/login", require("./controllers/auth/login"));   
app.post("/users/userdata", require("./controllers/users/userdata"));
app.post("/users/buytokens", require("./controllers/users/buytokens"));
app.post("/users/vq/findPosition", require("./controllers/vqueue/getposition"));
app.post("/users/vq/entervq", require("./controllers/vqueue/entervq"));
app.post("/users/vq/exitvq", require("./controllers/vqueue/exitvq"));
app.post("/users/vq/vqstats", require("./controllers/vqueue/vqstats"));
app.post("/users/vq/vqcitysearch", require("./controllers/vqueue/vqueuecitysearch"));
app.post("/users/serviceproviders/new", require("./controllers/vqueue/createserviceprovider"));
app.post("/users/serviceproviders/findvq", require("./controllers/vqueue/finvq"));
app.post("/users/serviceproviders/closevq", require("./controllers/serviceprovider/closevq"));
app.post("/users/serviceproviders/removefirst", require("./controllers/serviceprovider/removefirst"));

app.listen(port, ()=>console.log(`App is running on port ${port}`)); 
