const passport = require('passport');
const user = require('../models/user');
var bcrypt = require('bcrypt');

const router = require('express').Router();


router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', passport.authenticate(['local','google'], {
    successRedirect: '/secret',
    failureRedirect: '/auth/login'
}))

router.get('/register', (req, res) => {
    res.render('register.ejs');
})

router.post('/register', (req,res)=>{
    user.findOne({
                username: req.body.username
            }).then(async (currentuser) => {
                    if (currentuser) {
                        console.log(currentuser + 'alrealy user is present');
                        res.redirect('/auth/register');
        
                    } else {
                        const hashedPassword = await bcrypt.hash(req.body.password, 10);
                        
                        new user({
                            username: req.body.username,
                            password: hashedPassword
                        }).save().then((newuser) => {
                                console.log("new user created" + newuser);
                                req.login(newuser, function(err) {
                                    if (err) { return next(err); }
                                    return res.redirect('/secret');
                                  });
                        })
                        
                    }
                })
                        
});


router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/secret');
})

module.exports = router;


