import React, {useEffect} from "react";
import { useState } from "react";
import "../css/comment.css";
import Avatar from "./avatar";
import OptionsControl from "./optionsControl";


export default function Comment(props) {
    const [comment, setComment] = useState();
    const [isInEditMode, setEditMode] = useState(false);
    const [avatar, setavatar] = useState();
   
    useEffect(
        () => {
            const getUserAvatar = () => {
                fetch(`http://localhost:3000/api/auth/${props.comment.username}`, {
                credentials: "include",
            })
                .then( res => res.json())
                .then(value => { 
                    console.log(value)
                    fetch(`http://localhost:3000/images/${value.avatarUrl}`)
                    .then( res => res.blob())
                    .then( imageBlob =>  setavatar(URL.createObjectURL(imageBlob)))
                    } )
            };
            getUserAvatar()
        }, 
    //eslint-disable-next-line react-hooks/exhaustive-deps
    []   
    )
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
            <Avatar avatar={avatar} altText="avatar de l'auteur(e) du commentaire"/>
        <div className="comment">
            <div className="commentHeader">
            <p className="commentOwner">{props.comment.username}</p>
            {props.username === props.comment.username ?

                <OptionsControl modify={toogleEditMode} delete={deleteComment} />
            :""
               
            }
            
            
            </div>
                <p>{props.comment.text}</p>

                {/* Display only for comment owner */}
                   {props.username === props.comment.username ?

                        isInEditMode ?

                        <div>
                            
                        <input name={"title"} type={"text"} placeholder={"Modifiez votre commentaire"}
                        onChange={(e) => setComment(e.target.value)} />

                        <input type={"submit"} value={"Valider"} onClick={() => modifyComment()} />
                        </div>
                        : ""
                        : "" /*If not owner nothing is diplayed */
                } 
            </div>
        </div>
    )
}