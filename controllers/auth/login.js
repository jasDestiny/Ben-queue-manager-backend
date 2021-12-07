const mongoose=require("mongoose");
const UserData=require("../../models/user");
const crypto= require("crypto"); 
const tokenGen=require("./tokengenerator");

module.exports=async (req, res)=>{
    let userid=req.body.userid ;
    let password=crypto.createHash('md5').update(req.body.password).digest('hex');
    let x=await UserData.findOne({userid:userid, password:password});
    
    if(x===null){
        res.json({
            statuscode:"invalid user credentials"
        });
        return;
    }
    
    let tokenval=tokenGen();

    await UserData.updateMany({userid:userid},{$set: {authtoken:tokenval}})
    res.json({
        status:"Created Successfully",
        authtoken:tokenval
    });
    return;
}