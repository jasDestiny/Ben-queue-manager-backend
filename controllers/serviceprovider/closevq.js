const validator= require("../auth/validateuser");
const ServiceProviderData=require("../../models/serviceprovider")
const UserData=require("../../models/user");
module.exports=async (req, res)=>{
    let {userid, authtoken, placename}=req.body;
    let x=await validator(userid, authtoken);

    if(x===null){
        res.send({
            status:"Invalid auth credentials"
        });
        return;
    }

    let y= await ServiceProviderData.findOne({placename: placename});
    
    let arr=y.virtualqueue;
    for(i=0;i<arr.length;i++){
        let z=UserData.findOne({userid:arr[i].userid});
        console.log(z);
        await UserData.updateOne({userid:arr[i].userid},{$set:{tokens:String(parseInt(z.tokens)+1)}})
    }
    await ServiceProviderData.updateOne({placename: placename}, {$set:{virtualqueue:[]}})
    res.send(arr);
}