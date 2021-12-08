const mongoose=require("mongoose");
const UserData=require("../../models/user");
const ServiceProviderData=require("../../models/serviceprovider")
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

    else if(parseInt(x.tokens)<=0){
        res.send({
            status:"Buy more tokens to enter the queue"
        });
        return;
    }

    else{
        await UserData.updateOne({userid:userid}, {$set:{tokens: String(parseInt(x.tokens)-1)}});
    }

    let y= await ServiceProviderData.findOne({
        placename:req.body.placename
    });

    if(y===null){
        res.send({
            status:"Invalid place"
        }); 
    }

    let vq=y.virtualqueue;
    vq.push({userid: userid});
    await ServiceProviderData.updateOne({placename:req.body.placename}, {$set:{virtualqueue: vq}});
    res.send({
        status:"Entered successfully", 
        position: vq.length
    });
}