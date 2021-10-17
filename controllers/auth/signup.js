const mongoose=require("mongoose");
const UserData=require("../../models/user");
const crypto= require("crypto"); 
const tokenGen=require("./tokengenerator");

module.exports=async (req, res)=>{
    let userid=req.body.userid ;
    let password=crypto.createHash('md5').update(req.body.password).digest('hex');
    let usertype=req.body.usertype ;
    let city=req.body.city;
    let authtoken= tokenGen();
    let x=await UserData.findOne({userid:userid});
    
    if(x!==null){
        res.json({
            statuscode:"userid already exists"
        });
        return;
    }
    
    let tokenval=tokenGen();
    await new UserData({
        userid:userid,
        password:password,
        city:city,
        usertype:usertype,
        authtoken:authtoken,
        tokens: "0"
    }).save();

    res.json({
        status:"Created Successfully",
        tokenval:authtoken
    });
    return;
}