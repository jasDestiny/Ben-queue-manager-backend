const ServiceProviderData=require("../../models/serviceprovider")
const crypto= require("crypto"); 
const validator=require("../auth/validateuser");

module.exports = async (req, res)=>{

    let {userid, authtoken, city}=req.body;
    let x= await validator(userid, authtoken);

    if(x===null){
        res.send(
            {
                status: "500"
            }
        )
    }

    let y= await ServiceProviderData.find({city:city});
    res.send(y);
}
