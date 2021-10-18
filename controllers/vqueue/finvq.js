const mongoose=require("mongoose");
const UserData=require("../../models/user");
const ServiceProviderData=require("../../models/serviceprovider");

module.exports=async (req, res)=>{
    let placename=req.body.placename;
    let x= await UserData.findOne({
        userid:req.body.userid,
        authtoken:req.body.authtoken
    });

    if(x===null){
        res.send({
            status:"Invalid auth credentials"
        });
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

