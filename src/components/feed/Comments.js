import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import { FatText } from "../shared";
import Comment from "./Comment";

const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($photoId:Int!, $payload:String!){
        createComment(photoId:$photoId, payload:$payload){
            ok
            error
            id
        }
    }
`
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

function Comments({ photoId, author, caption, commentNumber, comments }) {
    const { data: userData } = useUser();
    const { register, handleSubmit, setValue, getValues } = useForm();
    const createCommentUpdate = (cache, result) => {
        const { payload } = getValues();
        setValue("payload", "");

        const {
            data: {
                createComment: { ok, id },
            },
        } = result;

        if (ok && userData?.me) {
            const newComment = {
                __typename: "Comment",
                createdAt: Date.now() + "", // stringify
                id,
                isMine: true,
                payload,
                user: {
                    ...userData.me,
                },
            };
            cache.modify({
                id: `Photo:${photoId}`,
                fields: {
                    comments(prev) {
                        return [...prev, newComment];
                    },
                    commentNumber(prev) {
                        return prev + 1;
                    }
                }
            })
        }
    }
    const [createCommentMutation, { loading }] = useMutation(CREATE_COMMENT_MUTATION,
        {
            update: createCommentUpdate,
        });

    const onValid = (data) => {
        const { payload } = data;
        if (loading) {
            return;
        }
        createCommentMutation({
            variables: {
                photoId,
                payload,
            }
        });
    }
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
            <div>
                <form onSubmit={handleSubmit(onValid)}>
                    <input
                        name="payload"
                        {...register('payload', { required: true })}
                        type="text"
                        placeholder="Write a comment. . ."
                    />
                </form>
            </div>
        </CommentsContainer>
    )
}

Comments.propTypes = {
    photoId: PropTypes.number.isRequired,
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