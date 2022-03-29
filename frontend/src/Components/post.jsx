import React from "react";
import '../css/post.css';
import Button from '../Components/button';
import Comments from "./comments";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faMessage } from '@fortawesome/free-solid-svg-icons'


import { useState, useEffect } from "react";

export default function Post(props) {
    const [isInEditMode, setEditMode] = useState(false);
    const [title, setTitle] = useState();
    const [text, setText] = useState();
    const [numberOfLikes, SetNumberOfLikes] = useState(0);
    const [comments, setComments] = useState([]); // All comments
    const [isFolded, setIsFolded] = useState(true);
    const [comment, setComment] = useState();

    const [showCommentInput, setShowCommentInput] = useState(false);


    const toogleEditMode = () => {
        setEditMode(!isInEditMode)
    }

    const deletePost = () => {
        fetch("http://localhost:3000/api/posts", {
            method: "DELETE",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                uuid: props.post.uuid,
            }),
        })
        props.getAllPosts()
    }

    const modifyPost = () => {
        fetch("http://localhost:3000/api/posts", {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                uuid: props.post.uuid,
                title: title,
                text: text,
            }),
        })
            .then(() => {
                props.getAllPosts()
                setEditMode();
            })

    }
    const likeUnlike = () => {
        fetch(`http://localhost:3000/api/likes/${props.post.uuid}`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                postId: props.post.uuid,
            }),
        })
            .then(getNumberOfLikes)
    }

    const getNumberOfLikes = () => {
        fetch(`http://localhost:3000/api/likes/${props.post.uuid}`, {
            credentials: "include",
        })
            .then(res => res.json())
            .then(likes => SetNumberOfLikes(likes.numberOfLikes));
    }
    //Comments

    const getAllComments = () => {
        fetch(`http://localhost:3000/api/comments/${props.post.uuid}`, {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": true,
                credentials: "include",
            },
        })
            .then(res => res.json())
            .then(value => {
                if (value.comments !== undefined) {
                    setComments(value.comments)

                } else {
                    console.log("aucun commentaires");
                }
            }
            )
            .catch((err) => console.log(err))
    }

    const postComment = () => {
        fetch(`http://localhost:3000/api/comments/${props.post.uuid}`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                postId: props.post.uuid,
                text: comment,
            }),
        })
            .then(() => {
                getAllComments();
            })
    }
    let commentText = "";
    if (comments.length < 2) {
        commentText = " commentaire";
    } else {
        commentText = " commentaires";
    }
    useEffect(() => {
        getNumberOfLikes();
        getAllComments();
    },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [])
    return (
        <div>
            <div className="post">
                <div>
                    {
                        isInEditMode ?
                            <div>
                                <label htmlFor={"title"}>Titre du post</label>
                                <input name={"title"} type={"text"} defaultValue={"Ecrivez un titre"}
                                    onChange={(e) => setTitle(e.target.value)} />

                                <label htmlFor={"text"}>Contenu</label>
                                <input name={"title"} type={"text"} defaultValue={"Ecrivez un post"}
                                    onChange={(e) => setText(e.target.value)} />

                                <input type={"submit"} value={"Valider"} onClick={modifyPost} />
                            </div>
                            :
                            <div>
                                <h3>{props.post.title}</h3>
                                <p>{props.post.text}</p>

                                <div className="socialDetails">
                                    <span className="numberOfLikes">
                                        <span className="numberOfLikes--circle">
                                            <FontAwesomeIcon className="numberOfLikes--thumb" icon={faThumbsUp} />
                                        </span>
                                        {numberOfLikes}
                                    </span>
                                    <p className="comments" onClick={() => setIsFolded(!isFolded)}>
                                        {comments.length}{commentText}</p>
                                </div>

                                {props.username === props.post.username ?
                                    <div>
                                        <Button onClick={deletePost} action="Supprimer" />
                                        <Button onClick={toogleEditMode} action="Modifier" />
                                    </div>
                                    : ""
                                }

                            </div>
                    }
                </div >
                <hr />
                <div className="socialActions">

                    <button className="socialActions--button" onClick={likeUnlike}>
                        <FontAwesomeIcon className="socialActions--icons" icon={faThumbsUp} />

                        J'aime</button>
                    <button className="socialActions--button" onClick={() => setShowCommentInput(!showCommentInput)}>
                        <FontAwesomeIcon className="socialActions--icons" icon={faMessage} />

                        Commenter</button>
                </div>
            </div>
            {
                showCommentInput ?
                    <div className="commentInput" >
                        <input placeholder="écrire un commentaire" type={"text"} onChange={(e) => setComment(e.target.value)} />
                        <button className="commentInput--button" onClick={postComment}>Valider</button>
                    </div>
                    : ""
            }
            <Comments username={props.username} postId={props.post.uuid} isFolded={isFolded} comment={comment} comments={comments} getAllComments={getAllComments} />
        </div>
    );
}