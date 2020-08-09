const express = require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');
app.use('/auth',authRoutes);
app.set("view engine","ejs");

app.get('/',(req,res)=>{
    res.render("home");
})

app.listen(3000,()=>{
    console.log("port started at 3000")
})





































// const express = require('express');
// const bcrypt= require('bcrypt');
// const mongoose = require('mongoose');
// const app = express();
// const flash = require('express-flash')
// const user=require('./models/user');
// const passport = require('passport');

// const session=require('express-session');
// const initialize= require('./passport-config');
// require('dotenv').config();

// const {mongourl}=require('./config/keys');
// mongoose.connect(mongourl,{ useUnifiedTopology: true , useNewUrlParser:true} );
// app.set('view engine','ejs');
// app.use(express.static("public"));
// app.use(flash());
// initialize(passport);
// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//       return next();
//     }
//     res.redirect("/login");
//   }
// app.use(express.urlencoded({extended:false}))
// // app.use(passport.initialize());
// // app.use(passport.session());
// app.get('/',isLoggedIn,(req,res)=>{
//     res.render('index',{name:'Kyle'});
// })
// app.get('/register', async (req,res)=>{
//     res.render('register.ejs');
// })
// app.get('/login', async (req,res)=>{
//     res.render('login');
// })
// app.post('/register', async (req,res)=>{
//     console.log(req.body);
//         const hashedapssword=await bcrypt.hash(req.body.password,10);
//         //  user.create({username:req.body.name, email:req.body.email,password:hashedapssword},(err,user)=>{
//         //     if(err)
//         //     {
//         //         console.log(err);
//         //         res.redirect('/register');
//         //     }
//         //     else{
//         //         console.log(user);
//         //         res.redirect('/');
//         //     }
//         // });
//         user.register(new user({ username: req.body.username, email: req.body.email }), hashedapssword, function (err, user) {
//             if (err) {
//               console.log(err);
//               return res.redirect('/register');
//             }
//             passport.authenticate("local")(req, res, function () {
//                 console.log("3");
//                 console.log(req.isAuthenticated());
//               res.redirect('/');
//             })
//           });
// })

// app.post('/login',passport.authenticate('local',{
// successRedirect:'/',
// failureRedirect:'/login',
// failureFlash:true
// }))

// app.listen(3000,()=>{
//     console.log("post started in port 3000");
// })