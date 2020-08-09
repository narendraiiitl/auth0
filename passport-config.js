const express=require('express');
const app= express();
const session= require("express-session");
const bodyparser = require('body-parser');
var localstrategy = require('passport-local');
const User= require('./models/user');


function initialize(passport){
    app.use(session({
        secret: "this will be used for decoding the password",
        resave: false,
        saveUninitialized: false
      
      }));
      
      app.use(passport.initialize());
      app.use(passport.session());
      app.use(bodyparser.urlencoded({ extended: true }));
      passport.use(new localstrategy(User.authenticate()));
      passport.serializeUser(User.serializeUser());
      passport.deserializeUser(User.deserializeUser());
      
}

  



module.exports=initialize;






































// const localstrategy= require('passport-local');
// const passport= require('passport');
// const user = require('./models/user');

// function initialize(passport,email){
//     const authenticateuser = (email,password,done)=>{
//     user.findOne({email:email},async (err,user)=>{
//         if(user==null)
//         {
//             return done(null,false,{message:'no user found'})
//         }
//         try{
//             if(await bcrypt.compare(password,user.password))
//             {
//                 console.log(user);
//                 return done(null,user);
//             }
//             else{
//                 return done(null,false,{message:"wrong password"});
//             }
//         }
//         catch (e)
//         {
//             return done(e)
//         }
//     })
//     }
//     passport.use(new localstrategy({usernameField:'email'},authenticateuser));
//     passport.serializeUser(function(user, done) {
//         done(null, user.id);
//         console.log(user.id);
//       });
      
//       passport.deserializeUser(function(id, done) {
//         user.findById(id, function(err, user) {
//             console.log(user);
//           done(err, user);
//         });
//       });
// }
// module.exports = initialize