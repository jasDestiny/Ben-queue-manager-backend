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
        if(vq[i].userid===userid){
            pos=i+1;
            break;
        }
    }

    if(pos==1){
        vq.shift()
    }
    else{
        vq.splice(pos-1, pos-1);
    }
    
    console.log(vq);
    await ServiceProviderData.updateOne({placename:req.body.placename}, {$set:{virtualqueue: vq}});
    res.send({
        status:"Removed from Virtual queue",
        position:pos
    });
}