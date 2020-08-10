const express = require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');
const passportsetup = require('./config/passport-setup');
const {mongourl} = require('./config/keys');
const mongoose = require('mongoose');
const cookiesession =require('cookie-session');
const passport = require('passport');
const bodyparser = require('body-parser');


app.set("view engine","ejs");
app.use(bodyparser.urlencoded({
    extended: true
  }));
app.use(cookiesession({
    maxAge:24*60*60*1000,
    keys:['this is the password']
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/auth',authRoutes);
mongoose.connect(mongourl,{ useUnifiedTopology:true,useNewUrlParser: true });

app.get('/',(req,res)=>{
    res.render("home");
})

app.get('/secret',validuser,(req,res)=>{
    res.render("secret");
})



function validuser(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/auth/login')
  }

app.listen(3000,()=>{
    console.log("port started at 3000")
})



































