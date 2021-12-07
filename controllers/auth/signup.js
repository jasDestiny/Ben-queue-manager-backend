const mongoose=require("mongoose");
const UserData=require("../../models/user");
const crypto= require("crypto"); 
const tokenGen=require("./tokengenerator");

module.exports=async (req, res)=>{
    let userid=req.body.userid ;
    let password=crypto.createHash('md5').update(req.body.password).digest('hex');
    let usertype=req.body.usertype ;
    let city=req.body.city;
    let x=await UserData.findOne({userid:userid});
    res.header("Access-Control-Allow-Origin", "*");
    if(x!==null){
        res.status(200).json({
            statuscode:"userid already exists"
        })
    }
    else{
        let authtoken= tokenGen();
        await new UserData({
        userid:userid,
        password:password,
        city:city,
        usertype:usertype,
        authtoken:authtoken,
        tokens: "0"
        }).save();

        res.status(200).json({
            status:"200",
            userid: userid,
            city: city,
            tokenval:authtoken
        });
    }


    
    return;
}