const mongoose=require("mongoose");
const UserData=require("../../models/user");
const validator=require("../auth/validateuser");

module.exports= async (req, res)=>{
    let userid=req.body.userid ;
    let amount=req.body.money;
    let authtoken=req.body.authtoken;

    let x= await validator(userid, authtoken);

    if(x===null){
        res.send({
            status:"Invalid auth credentials"
        });
        return;
    }
    let tn=parseInt(x.tokens)
    
    if(amount==="100"){
        await UserData.updateOne({userid:userid}, {$set:{tokens: String(tn+1)}})
    }

    else if(amount==="500"){
        await UserData.updateOne({userid:userid}, {$set:{tokens: String(tn+10)}})
    }

    else if(amount==="1000"){
        await UserData.updateOne({userid:userid}, {$set:{tokens: String(tn+25)}})
    }

    res.send(await UserData.findOne({
        userid:userid,
        authtoken:authtoken
    }));
}