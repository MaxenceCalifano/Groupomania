import React from "react";

import { useState, useEffect } from "react";
import Comment from "./comment";

export default function Comments(props){

    const [comment, setComment] = useState();
    const [comments, setComments] = useState([]); // All comments
 

 
    const postComment = () => {
        fetch(`http://localhost:3000/api/comments/${props.postId}`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                postId: props.postId,
                text: comment,
            }),
        })
            .then(() => {
                getAllComments();
            })
    }


    const getAllComments = () => {
        fetch(`http://localhost:3000/api/comments/${props.postId}`, {
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

    useEffect(() => getAllComments(),
        //eslint-disable-next-line react-hooks/exhaustive-deps
        []);

    return (
        <div>
    {
        comments.map((comment, key) => {
            return <Comment postId={props.postId}
                            getAllComments={getAllComments}
                            key={key}
                            comment={comment}
                            username={props.username}
                            />
        })
    }
    <input placeholder="écrire un commentaire" type={"text"} onChange={(e) => setComment(e.target.value)} />
    <input type={"submit"} value={"Valider"} onClick={postComment} />

</div>
    )
}

