const User = require("../models/user");

//lets not add async await in user's controller for now

module.exports.profile=function(req,res){
    User.findById(req.params.id).then((user)=>{
        return res.render('user_profile',{
            title: "Users",
            profile_user: user
        });
    });
    
}

module.exports.update = function(req,res){
    if(req.user.id = req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body).then((user)=>{
            req.flash('success', 'Updated!');
            return res.redirect('back');
        });
    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
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
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}).then((user)=>{
        if(!user){
            User.create(req.body).then(()=>{
                req.flash('success', 'You have signed up, login to continue!');
                return res.redirect('/users/sign-in');
            }).catch((err)=>{
                req.flash('error', err);
            });
        }else{
            req.flash('error', 'User already exist!');
            return res.redirect('back');
        }
    }).catch((err)=>{
        req.flash('error', err);
        return res.redirect('back'); 
    });
}
//sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'You have logged out!');
        return res.redirect('/users/sign-in');
    });
}