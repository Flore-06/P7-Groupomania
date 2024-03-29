const PublishComment = (comment) => {
 
    console.log(comment);

    return (
        <div key={comment._id}>
                <div className="advice__comment"  >
                    <div className="comment-info__user">
                        <img 
                            src={comment.comment.user[0].imageUrl}
                            alt="icone utilisateur"
                            className="user-comment-image"
                        ></img>
                        <div className="comment__name-date">
                            <p className="comment-user-name">{comment.comment.user[0].name} {comment.comment.user[0].surname}</p>
                        </div>
                    </div>
                    <p className="comment-text">{comment.comment.message}</p>
                </div>
        </div>

    )
}

export default PublishComment