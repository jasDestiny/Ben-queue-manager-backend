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
    let pos=-1;
    for(i=0;i<vq.length;i++){
        console.log("here");
        if(vq[i].userid===userid){
            pos=i+1;
            break;
        }
    }
    
    res.send({
        status:"Found",
        position:pos
    });
}