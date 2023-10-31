const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        if(req.xhr){
            //if we only want a few specific fields returned for the populated documents? This can be accomplished by passing the usual field name syntax as the second argument to the populate method
            post = await post.populate('user','name');
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created"
            });
        }
        req.flash('success','Post Published!');
        return res.redirect('back');
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
};

module.exports.destroy = async function(req, res){
    try{
        //.id means converting the object id into string
        let post = await Post.findById(req.params.id);

        if(post.user==req.user.id){
            post.deleteOne();
            await Comment.deleteMany({post: req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                })
            }
            req.flash('success','Post and associated comments deleted!');
        }else{
            req.flash('error','You cannot delete this post!');
        }
        
        return res.redirect('/');
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}