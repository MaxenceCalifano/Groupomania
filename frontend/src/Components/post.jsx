import React from "react";
import '../css/post.css';

import { useState } from "react";

export default function Post(props) {
    const [isInEditMode, setEditMode] = useState(false);
    const [title, setTitle] = useState();
    const [text, setText] = useState();
    const toogleEditMode = () => {
        setEditMode(!isInEditMode)
    }

    const deletePost = () => {
        fetch("http://localhost:3000/api/", {
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
        fetch("http://localhost:3000/api/", {
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
                            <button onClick={deletePost}>Supprimer</button>
                            <button onClick={toogleEditMode}>Modifier</button>
                        </div>
                }
            </div >
            <div>
                <input defaultValue={"écrire un commentaire"} type={"text"} />
            </div>
        </div>
    );
}