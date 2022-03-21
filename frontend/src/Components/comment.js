import React from "react";
import { useState } from "react";


export default function Comment(props) {
    const [comment, setComment] = useState();
    const [isInEditMode, setEditMode] = useState(false);

    const modifyComment = () => {
        fetch(`http://localhost:3000/api/comments/${props.postId}`, {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                uuid: props.comment.uuid,
                text: comment,
            }),
        })
            .then(() => {
                props.getAllComments();
                setEditMode();
            })

    }
    return(
        <div className="comment">
                <p>{props.comment.username}</p>
                <p>{props.comment.text}</p>

                {/* Display only for comment owner */}
                   {props.username === props.comment.username ?

                        isInEditMode ?

                        <div>
                        <input name={"title"} type={"text"} placeholder={"Modifiez votre commentaire"}
                        onChange={(e) => setComment(e.target.value)} />

                        <input type={"submit"} value={"Valider"} onClick={() => modifyComment()} />
                        </div>
                        :
                        <div>
                        {/*  <button onClick={console.log("supprimer comm")}>Supprimer</button> */}
                            <button onClick={setEditMode}>Modifier</button>
                        </div>
                        : "" /*If not owner nothing is diplayed */
                } 
            </div>
    )
}