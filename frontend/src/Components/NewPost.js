import React from "react";
import { useState } from "react";
import "../css/newPost.css"
import PostModale from "./postModale";

export default function NewPost(props) {

    const [title, setTitle] = useState();
    const [text, setText] = useState();
    const [caption, setCaption] = useState();
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
    formData.append('caption', caption);

    const post = () => {
        fetch("http://localhost:3000/api/posts", {
        method: "POST",
        credentials: "include",
        body: formData,
    })
    .then( res => {
        if(res.ok) props.getAllPosts()
        //Reset img state to default
        const defaultImg = {preview:"", data:""};
        setImage(defaultImg);
        toogleEditMode()
    })
    .catch(err => console.error(err))
    }
    
    const toogleEditMode = () => {
        setEditMode(!isInEditMode)
    }

    const toogleEditModeOnPressEnter = (e) => {
        if(e.code === "Enter") toogleEditMode(!isInEditMode)
    }

    if(isInEditMode) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";

    }

    return (
        <div className="newPost">
            <label hidden htmlFor="newPost">Créer un nouveau post</label>
           <input className="startPost" id="newPost" name="newPost" type="text" placeholder="Ecrivez quelque chose..." onClick={toogleEditMode} onKeyPress={toogleEditModeOnPressEnter} ></input>

        {
            isInEditMode ?
            <div>
                <div className="modale_background_overlay"></div>
                <PostModale getFile={getFile}
                            toogleEditMode={toogleEditMode}
                            image={image} 
                            setTitle={setTitle} 
                            setText={setText} 
                            setCaption={setCaption} 
                            post={post}
                            actionText="Créer un post" />
            </div>
            : ""
        }
        </div>
        
        
    );
}