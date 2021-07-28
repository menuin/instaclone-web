import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../shared";
import Comment from "./Comment";


const CommentsContainer = styled.div`
    margin-top : 20px;
`
const CommentCaption = styled.span`
    margin-left : 10px;
`
const CommentCount = styled.span`
    opacity : 0.7;
    font-size : 12px;
    margin : 10px 0px;
    display:block;
    font-weight : 600;
`

function Comments({ author, caption, commentNumber, comments }) {
    return (
        <CommentsContainer>
            <Comment author={author} payload={caption}>
                <FatText>{author}</FatText>
                <CommentCaption>{caption}</CommentCaption>
            </Comment>
            <CommentCount>{commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}</CommentCount>
            {comments?.map(comment =>
                <Comment key={comment.id} author={comment.user.username} payload={comment.payload}>
                    <FatText>{comment.user.username}</FatText>
                    <CommentCaption>{comment.payload}</CommentCaption>
                </Comment>
            )}
        </CommentsContainer>
    )
}

Comments.propTypes = {
    author: PropTypes.string.isRequired,
    caption: PropTypes.string,
    commentNumber: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        user: PropTypes.shape({
            avatar: PropTypes.string,
            username: PropTypes.string.isRequired,
        }),
        payload: PropTypes.string.isRequired,
        isMine: PropTypes.bool.isRequired,
        createdAt: PropTypes.string.isRequired,
    }))
}

export default Comments;