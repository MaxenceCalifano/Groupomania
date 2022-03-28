import React from "react";
import '../css/post.css';
import Button from '../Components/button';
import Comments from "./comments";

import { useState } from "react";

export default function Post(props) {
    const [isInEditMode, setEditMode] = useState(false);
    const [title, setTitle] = useState();
    const [text, setText] = useState();



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
        fetch(`http://localhost:3000/api/posts/${props.post.uuid}`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                postId: props.post.uuid,
            }),
        })
    }
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
            <Comments username={props.username} postId={props.post.uuid} />
            <Button onClick={likeUnlike} action="like" />

        </div>
    );
}