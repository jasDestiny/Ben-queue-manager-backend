const mongoose=require("mongoose");
const UserData=require("../../models/user");
const ServiceProviderData=require("../../models/serviceprovider");
const validator=require("../auth/validateuser");

module.exports= async (req, res)=>{
    let userid=req.body.userid ;
    let authtoken=req.body.authtoken;

    let x= await validator(userid, authtoken);

    if(x===null){
        res.send({
            status:"Invalid auth credentials"
        });
        return;
    }
    res.send(x);
    return;
}