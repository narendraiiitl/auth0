const mongoose= require('mongoose');

const passportlocalmongoose=require('passport-local-mongoose');
const userschema= new mongoose.Schema({
    username:String,
    googleid:String,
    password:String
})
userschema.plugin(passportlocalmongoose);
module.exports = mongoose.model("user",userschema);