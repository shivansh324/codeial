const User = require("../models/user");

module.exports.profile=function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id).then((user)=>{
            if(user){
                return res.render('user_profile',{
                    title: "User Profile",
                    user: user
                })
            }
            return res.redirect('/users/sign-in');
        })
    }else{
        return res.redirect('/users/sign-in');
    }
}

//render the sign up page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title: "Codial | Sign Up"
    })
}
//render the sign in page
module.exports.signIn=function(req,res){
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
    //find the user
    User.findOne({email:req.body.email}).then((user)=>{
        //handle user found
        if(user){

            if(user.password!=req.body.password){
                //handle password which doesn't match
                return res.redirect('back');
            }
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile')
                //handle session creation
        }else{
            //handle user not found
            return res.redirect('back');
        }
    }).catch((Error)=>{console.log('error in creating user while signing in');});
}

module.exports.destroySession=function(req,res){
    console.log(req.body.email);
    res.cookie('user_id','');
    return res.redirect('/users/sign-in');
}