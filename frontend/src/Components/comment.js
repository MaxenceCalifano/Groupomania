import React, {useEffect} from "react";
import { useState } from "react";
import "../css/comment.css";


export default function Comment(props) {
    const [comment, setComment] = useState();
    const [isInEditMode, setEditMode] = useState(false);
    const [avatar, setavatar] = useState();
   
    useEffect(
        () => {
            const getUser = () => {
                fetch(`http://localhost:3000/api/auth/${props.comment.username}`, {
                credentials: "include",
                method: "POST",
                headers: {"Content-Type": "application/json",},
                body: 
                    JSON.stringify({username: props.comment.username})
                ,
            })
                .then( res => res.json())
                .then(value => { 
                    console.log(value)
                    fetch(`http://localhost:3000/images/${value.avatarUrl}`)
                    .then( res => res.blob())
                    .then( imageBlob =>  setavatar(URL.createObjectURL(imageBlob)))
                    } )
            };
            getUser()
        }, 
    //eslint-disable-next-line react-hooks/exhaustive-deps
    []   
    )

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

    const deleteComment = () => {
        fetch("http://localhost:3000/api/comments", {
            method: "DELETE",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                uuid: props.comment.uuid,
            }),
        })
        .then(()=> {
            props.getAllComments();
        })
    }
    return(
        <div className="commentWrapper">
            <img className="ownerAvatar" src={avatar} alt="ownerAvatar" />
        <div className="comment">
                <p className="commentOwner">{props.comment.username}</p>
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
                            <div className="commentOptions">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
                            <button onClick={setEditMode}>Modifier</button>
                            <button onClick={deleteComment}>Supprimer</button>

                        </div>
                        : "" /*If not owner nothing is diplayed */
                } 
            </div>
        </div>
    )
}