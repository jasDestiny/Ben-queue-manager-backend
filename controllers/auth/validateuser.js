const mongoose= require("../../config/MongooseConnect");
const UserData=require("../../models/user");

module.exports=async(userid, authtoken)=>{
    let x= await UserData.findOne({
        userid:userid,
        authtoken:authtoken
    });

    if(x===null){
        return x;
    }

    else{
        return x;
    }
};