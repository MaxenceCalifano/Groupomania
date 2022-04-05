import React from "react";
import Button from "./button";


export default function PostModale(props) {
    return (
        <div>
                <div className="newPost-input createNewPost">
                    <div className="createNewPost-header">
                        <p>Créer un post</p>
                        <Button style={{border: "none", color:"#282828"}} onClick={props.toogleEditMode} action="X"/>
                    </div>    

                    <div className="postContent">
                        <input autoFocus className="postTitle" name={"title"} type={"text"} placeholder={"Donnez un titre à votre post"}
                        onChange={ (e) => props.setTitle(e.target.value)}></input>

                        <textarea placeholder="Écrivez ! Noircir le papier est idéal pour s'éclaircir l'esprit. -Aldous Huxley" className="postText" name="postText"
                        rows={10} onChange={ (e) => props.setText(e.target.value)}></textarea>
                        <input type={"file"} name={"image"} accept="image/png, image/jpeg, image/jpg"
                        onChange={props.getFile} ></input>
                        {props.image.preview !=="" ? <img src={props.image.preview} alt="avatar" width='100' height='auto'/>
                        : ""    
                    }
                    </div>

                    <Button onClick={props.post} action="Poster" style={{color:"#0B5E9E"}} />
                </div>
        </div>
    )
}