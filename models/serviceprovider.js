const mongoose=require("mongoose");

const ServiceProviderSchema= new mongoose.Schema({
    userid:{
        type:String,
        required: [true, 'userid is required']
    },
    placename:{
        type:String,
        required:[true, 'name is required']
    },
    location:{
        type:String,
        required: [true, 'password is required']
    },
    city:{
        type:String,
        required: [true, 'org is required']
    },
    crowdStats:[
        {
            type:String
        }
    ],
    vqid:{
        type:String,
        required:[true, 'vqid is required']
    },
    description:{
        type:String,
        required: true
    },
    virtualqueue:[
        {
            userid:String
        }
    ],
    startingTime:{
        type:String,
        required:true
    },
    closingTime:{
        type:String,
        required:true
    }
});

module.exports= mongoose.model("ServiceProviderData", ServiceProviderSchema, "ServiceProviderData");