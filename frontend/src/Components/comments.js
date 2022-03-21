import React from "react";

import { useState, useEffect } from "react";

export default function Comments(props){

    const [text, setText] = useState();
    const [comment, setComment] = useState();
    const [comments, setComments] = useState([]); // All comments

    const postComment = () => {
        fetch(`http://localhost:3000/api/comments/${props.postId}`, {
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

    const modifyComment = () => {
        fetch(`http://localhost:3000/api/comments/${props.postId}`, {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                uuid: props.post.uuid,
                text: text,
            }),
        })
            .then(() => {
                props.getAllPosts()
               // setEditMode();
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
            return <div className="comment" key={key}>
                <p>{comment.username}</p>
                <p>{comment.text}</p>
                {/*   {props.username === comment.username ?
                    <div>
                        <button onClick={console.log("supprimer comm")}>Supprimer</button>
                        <button onClick={console.log("modifier comm")}>Modifier</button>
                    </div>
                    : ""
                } */}
            </div>
        })
    }
    <input placeholder="écrire un commentaire" type={"text"} onChange={(e) => setComment(e.target.value)} />
    <input type={"submit"} value={"Valider"} onClick={postComment} />

</div>
    )
}

