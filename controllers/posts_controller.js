const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create=function(req, res){
    Post. create({
        content: req.body.content,
        user: req.user._id
    }).then((post)=>{return res.redirect('back');}).catch((Error)=>{console.log("error in creating a post"); return;})
};

module.exports.destroy = function(req, res){
     Post.findById(req.params.id).then((post)=>{
        //.id means converting the object id into string
        if(post.user==req.user.id){
            post.deleteOne();
            Comment.deleteMany({post: req.params.id}).then(()=>{return res.redirect('/');});
            // .exec(function(err){
            //     return res.redirect('back');
            // });
        }
     }).catch((Error)=>{console.log(Error); return res.redirect('back');});
}