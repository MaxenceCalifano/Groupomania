import React from "react";
import '../css/post.css';
import Button from '../Components/button';
import Comments from "./comments";

import { useState, useEffect } from "react";

export default function Post(props) {
    const [isInEditMode, setEditMode] = useState(false);
    const [title, setTitle] = useState();
    const [text, setText] = useState();
    const [numberOfLikes, SetNumberOfLikes] = useState(0);
    const [comments, setComments] = useState([]); // All comments
    const [isFolded, setIsFolded] = useState(true);
    const [comment, setComment] = useState();

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
                                <p>mention j'aime : {numberOfLikes}</p>
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
            <div className="postActions">
                <div>
                    <input placeholder="écrire un commentaire" type={"text"} onChange={(e) => setComment(e.target.value)} />
                    <input type={"submit"} value={"Valider"} onClick={postComment} />
                </div>
                <Button onClick={likeUnlike} action="like" />
            </div>

            <Comments username={props.username} postId={props.post.uuid} isFolded={isFolded} comment={comment} />


        </div>
    );
}