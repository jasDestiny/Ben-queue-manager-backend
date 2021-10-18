const crypto=require("crypto");


module.exports=(v)=>{
    let string=crypto.createHash('md5').update((Math.random()*100000).toString()).digest('hex');
    return string;
}
