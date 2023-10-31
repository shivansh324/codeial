//Implementing it using classses

class PostComments{

    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);//li element of whole post
        this.newCommentForm = $(`#post-${postId}-comments-form`);//comment's form in above li element

        this.createComment(postId);

        //using this for existing post-comments before AJAX doesn't have AJAX
        let self = this;
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });

    }

    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;//self is newCommentForm
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),//serializing the comment form data
                success: function(data){
                    let newComment = pSelf.newCommentDom(data.data.post);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));

                }, error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

    newCommentDom(comment){
        return $(`
        <li id="comment-${comment._id}">
            <p>
                <small>
                    <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                </small>
                    ${comment.content}
                <br>
                <small>
                    ${comment.user.name}
                </small>
            </p>
        </li>`
        );
    }

    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

}