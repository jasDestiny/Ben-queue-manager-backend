const mongoose=require("mongoose");
const UserData=require("../../models/user");
const ServiceProviderData=require("../../models/serviceprovider")
const crypto= require("crypto"); 
const tokenGen=require("../auth/tokengenerator");
const validator=require("../auth/validateuser");

let randn_bm=(v, u)=>{
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}
module.exports=async (req, res)=>{
    let userid=req.body.userid ;
    let placename=req.body.placename ;
    let location=req.body.location ;
    let city=req.body.city ;
    let startingTime=req.body.startingTime;
    let closingTime=req.body.closingTime;
    let endingTime=req.body.endingTime;
    let authtoken=req.body.authtoken;

    let x= await validator(userid, authtoken);

    if(x===null){
        res.send({
            status:"Invalid auth credentials"
        });
        return;
    }

    let y=await ServiceProviderData.findOne({placename:placename, city:city});

    if(y!==null){
        res.send({
            status:"Place already exists in your city, enter a different place"
        });
        return;
    }

    let crowdStats=[]
    let vqid= crypto.createHash('md5').update(String(Number(Math.random()*1000000))).digest('hex');
    let virtualqueue=[]
    
    console.log(vqid);
    let avgCrowd=String(Math.abs(parseInt(Math.random()*100)))
    await crowdStats.push(avgCrowd)

    for(i=1/288;i<=1;i+=1/288)
        await crowdStats.push(String(Math.abs(parseInt(avgCrowd*randn_bm(i,i)))))
    
    console.log(crowdStats);
    await new ServiceProviderData({
        userid:userid,
        placename:placename,
        location:location,
        city:city,
        startingTime:startingTime,
        closingTime:closingTime,
        endingTime:endingTime,
        vqid:vqid,
        crowdStats:crowdStats,
        virtualqueue:virtualqueue
    }).save();

    res.json({
        status:"Created Successfully",
    }); 
    return;
}
