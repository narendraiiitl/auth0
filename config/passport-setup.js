const passport = require('passport');
const googlestrategy= require('passport-google-oauth20');
const {clientID,clientSecret}=require('./keys');
passport.use(
    new googlestrategy({
        //option for google strategy
        clientID:clientID,
        clientSecret:clientSecret
    },()=>{

    })
)   