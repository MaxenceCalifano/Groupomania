import React from "react";
import { useState } from "react";

export default function NewPost(props) {

    const [title, setTitle] = useState();
    const [text, setText] = useState();

    const post = () => {
        fetch("http://localhost:3000/api", {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            title: title,
            text: text,
        })
    })
    .then( res => {
        if(res.ok) props.getAllPosts()
    })
    .catch(err => console.error(err))
    }
    
    return (
        <div>
            <label htmlFor={"title"}>Titre du post</label>
            <input name={"title"} type={"text"} defaultValue={"Ecrivez un titre"}
             onChange={ (e) => setTitle(e.target.value)}></input>

            <label htmlFor={"text"}>Contenu</label>
            <input name={"title"} type={"text"} defaultValue={"Ecrivez un post"} onChange={ (e) => setText(e.target.value)} ></input>

            <input type="submit" value="Poster" onClick={post}></input>
        </div>
        
    );
}