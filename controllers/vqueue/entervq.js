const mongoose=require("mongoose");
const UserData=require("../../models/user");
const ServiceProviderData=require("../../models/serviceprovider")

module.exports= async (req, res)=>{
    let userid=req.body.userid ;
    let amount=req.body.money;
    let authtoken=req.body.authtoken;

    let x= await UserData.findOne({
        userid:userid,
        authtoken:authtoken
    });

    if(x===null){
        res.send({
            status:"Invalid auth credentials"
        });
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
    vq.push(req.body.userid);
    await ServiceProviderData.updateOne({placename:req.body.placename}, {$set:{virtualqueue: [{userid: userid}]}});
    res.send({
        status:"Entered successfully", 
    });
}