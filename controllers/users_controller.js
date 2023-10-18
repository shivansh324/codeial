const User = require("../models/user");

module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title: "Users"
    })
}

//render the sign up page
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up',{
        title: "Codial | Sign Up"
    })
}
//render the sign in page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: "Codial | Sign In"
    })
}

//get the sign-up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}).then((user)=>{
        if(!user){
            User.create(req.body).then(res.redirect('/users/sign-in')).catch((Error)=>{console.log('error in creating user while signing up');});
        }else{
            return res.redirect('back');
        }
    }).catch((Error)=>{console.log('error in finding user while signing up'); return});
}
//sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        return res.redirect('/users/sign-in');
    });
}