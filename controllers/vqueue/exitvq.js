const mongoose=require("mongoose");
const UserData=require("../../models/user");
const ServiceProviderData=require("../../models/serviceprovider");
const userdata = require("../users/userdata");
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

    let y= await ServiceProviderData.findOne({
        placename:req.body.placename
    });

    if(y===null){
        res.send({
            status:"Invalid place"
        }); 
    }

    let vq=y.virtualqueue;
    let pos=-1;
    for(i=0;i<vq.length;i++){
        if(vq[i].userid===userid){
            pos=i+1;
            break;
        }
    }

    if(pos==-1){
        res.send({
            status:"Invalid request. Not in the virtual queue"
        });
    }
    else if(pos==1){
        vq.shift()
    }

    else{
        await UserData.updateOne({userid:userid}, {$set:{tokens: String(parseInt(x.tokens)+1)}});
        vq.splice(pos-1, pos-1);
    }
    
    console.log(vq);
    await ServiceProviderData.updateOne({placename:req.body.placename}, {$set:{virtualqueue: vq}});
    res.send({
        status:"Removed from Virtual queue",
        position:pos
    });
}