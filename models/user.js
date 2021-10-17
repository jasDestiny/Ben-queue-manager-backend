const mongoose=require("mongoose");

const UserSchema= new mongoose.Schema({
    userid:{
        type:String,
        required: [true, 'userid is required']
    },
    password:{
        type:String,
        required: [true, 'password is required']
    },
    city:{
        type:String,
        required: [true, 'org is required']
    },
    usertype:{
        type:String,
        required: [true, 'orgtype is required']
    },
    authtoken:{
        type:String,
        required: [true, 'authtoken is not mandatory']
    },
    tokens:{
        type:String,
        required: [true, 'tokenval is not mandatory']
    }
});

module.exports= mongoose.model("UserData", UserSchema, "UserData");