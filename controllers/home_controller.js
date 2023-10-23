const Post = require('../models/post');

module.exports.home= function(req,res){

    // Post.find({}).then((posts)=>{

    //     return res.render('home',{
    //         title: "Codeial | Home",
    //         posts: posts
    //     });
    // }).catch((Error)=>{console.log('error')});
    Post.find({})
    .populate('user')
    .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
    })
    .then((posts)=>{    
        return res.render('home',{
            title: "Codeial | Home",
            posts: posts
        });
    }).catch((Error)=>{console.log('error')});
    
}