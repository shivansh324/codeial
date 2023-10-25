const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    try{
        await Post. create({
            content: req.body.content,
            user: req.user._id
        });
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