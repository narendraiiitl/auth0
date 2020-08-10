const passport = require('passport');
const googlestrategy = require('passport-google-oauth20');
const localstrategy = require('passport-local');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { clientID, clientSecret } = require('./keys');
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
    .catch((e)=>{
        console.log(`Error: ${error}`);
    })
})
passport.use(
    new googlestrategy({
        //option for google strategy
        callbackURL: '/auth/google/redirect',
        clientID: clientID,
        clientSecret: clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleid: profile.id }).then((currentuser) => {
            if (currentuser) {
                console.log(currentuser);
                done(null, currentuser);
            } else {
                new User({
                    username: profile.displayName,
                    googleid: profile.id
                }).save().then((newuser) => {
                    console.log("new user created" + newuser);
                    done(null, newuser);
                })
            }
        })
    })
)

passport.use(new localstrategy(
    function (username, password, done) {
         User.findOne({ username: username }, async function (err, user) {
            if (err) {  return done(err);  }
            if (!user) { return done(null, false);  }
            try{
                if( await bcrypt.compare(password, user.password))
                {
                    return done(null, user);
                }
                else
                {
                    return done(null, false);
                }
            }
            catch (e) {
                console.log(e);
            }
        }
)
})  )