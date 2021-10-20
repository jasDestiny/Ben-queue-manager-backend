const mongoose=require("mongoose");
const UserData=require("../../models/user");
const ServiceProviderData=require("../../models/serviceprovider");
const validator=require("../auth/validateuser");
module.exports=async (req, res)=>{
    let {userid, authtoken}=req.body;
    let placename=req.body.placename;
    let x=await validator(userid, authtoken);
    if(x===null){
        res.send({
            status:"Invalid auth credentials"
        });
        return;
    };

    let y= await ServiceProviderData.findOne({
        location:req.body.location,
        placename:placename
    }); 



    if(y)
        res.send({
            status:"found",
            queueid:y.vqid,
            vqstats:y.crowdStats,
        });
    

    y= await ServiceProviderData.find({
        location:req.body.location
    });

    let ps=[];
    for(var k in y){
        var obj=y[k];
        console.log(obj);
        ps.push(obj.placename);
    }

    res.send(
    {
        status:"Not found",
        popularsuggestions:ps
    }
    );
}

