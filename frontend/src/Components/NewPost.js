import React from "react";
import { useState } from "react";
import "../css/newPost.css"
import Button from "./button";

export default function NewPost(props) {

    const [title, setTitle] = useState();
    const [text, setText] = useState();
    const [image, setImage] = useState({preview:"", data:""});

    const [isInEditMode, setEditMode] = useState(false);

    const getFile = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data:  e.target.files[0],
        }
        setImage(img);
    }
    let formData = new FormData();
    formData.append('title', title);
    formData.append('text', text);
    formData.append('image', image.data);

    const post = () => {
        fetch("http://localhost:3000/api/posts", {
        method: "POST",
        credentials: "include",
        body: formData,
    })
    .then( res => {
        if(res.ok) props.getAllPosts()
        toogleEditMode()
    })
    .catch(err => console.error(err))
    }
    
    const toogleEditMode = () => {
        setEditMode(!isInEditMode)
    }

    if(isInEditMode) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";

    }

    return (
        <div className="newPost">
           <input className=" newPost-input startPost" name="text" type="text" placeholder="Ecrivez quelque chose..." onClick={toogleEditMode} ></input>

        {
            isInEditMode ?
            <div>
                <div className="modale_background_overlay"></div>
                <div className="newPost-input createNewPost">
                <div className="createNewPost-header">
                    <p>Créer un post</p>
                    <Button style={{border: "none", color:"#282828"}} onClick={toogleEditMode} action="X"/>
                </div>    

                <div className="postContent">
                    <input autoFocus className="postTitle" name={"title"} type={"text"} placeholder={"Donnez un titre à votre post"}
                    onChange={ (e) => setTitle(e.target.value)}></input>

                    <textarea placeholder="Écrivez ! Noircir le papier est idéal pour s'éclaircir l'esprit. -Aldous Huxley" className="postText" name="postText"
                    rows={10} onChange={ (e) => setText(e.target.value)}></textarea>
                    <input type={"file"} name={"image"} accept="image/png, image/jpeg, image/jpg"
                    onChange={getFile} ></input>
                    {image.preview !=="" ? <img src={image.preview} alt="avatar" width='100' height='auto'/>
                    : ""    
                }
                </div>

                    <Button onClick={post} action="Poster" style={{color:"#0B5E9E"}} />
                    </div>
            </div>
            : ""
        }
        </div>
        
        
    );
}