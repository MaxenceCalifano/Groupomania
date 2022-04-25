import React from "react";
import { useState } from "react";
import "../css/comment.css";
import Avatar from "./avatar";
import OptionsControl from "./optionsControl";


export default function Comment(props) {
    const [comment, setComment] = useState();
    const [isInEditMode, setEditMode] = useState(false);

    function toogleEditMode() {
        setEditMode(!isInEditMode)
    }
    const modifyComment = () => {
        fetch(`http://localhost:3000/api/comments/${props.postId}`, {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: props.comment.commentId,
                text: comment,
            }),
        })
            .then(() => {
                props.getAllComments();
                toogleEditMode();
            })

    }

    const deleteComment = () => {
        fetch("http://localhost:3000/api/comments", {
            method: "DELETE",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: props.comment.commentId,
            }),
        })
        .then(()=> {
            props.getAllComments();
        })
    }
    return(
        <div className="commentWrapper">
            <Avatar avatar={props.comment.avatarUrl} altText="avatar de l'auteur(e) du commentaire"/>
        <div className="comment">
            <div className="commentHeader">
            <p className="commentOwner">{props.comment.username}</p>
            {props.username === props.comment.username || localStorage.getItem("privilege") === "1" ?

                <OptionsControl modify={toogleEditMode} delete={deleteComment} />
            :""
               
            }
            
            
            </div>
                <p>{props.comment.text}</p>

                {/* Display only for comment owner */}
                   {props.username === props.comment.username ?

                        isInEditMode ?

                        <div className="commentModifications">   
                            <input className="modifyCommentInput" name={"title"} type={"text"} defaultValue={props.comment.text} placeholder={"Modifiez votre commentaire"}
                            onChange={(e) => setComment(e.target.value)} />

                            <input className="commentInput--button" type={"submit"} value={"Valider"} onClick={() => modifyComment()} />
                        </div>
                        : ""
                        : "" /*If not owner nothing is diplayed */
                } 
            </div>
        </div>
    )
}