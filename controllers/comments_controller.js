const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){//.then() return a promise or error so no need to use if(post)
    Post.findById(req.body.post).then((post)=>{ 
        Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        }).then((comment)=>{
            post.comments.push(comment);
            post.save();
            return res.redirect('/');
        }).catch((Error)=>{console.log("Error in creating a comment to post link"); return res.redirect('/');});
    }).catch((Error)=>{console.log("Error in creating a post to comment link"); return res.redirect('/');});
};