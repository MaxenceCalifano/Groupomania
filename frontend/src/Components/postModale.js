import React from "react";
import Button from "./button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';


export default function PostModale(props) {

    console.log(window.scrollY);
    const viewPosition = window.scrollY + 30;
    return (
        <div>
                <div style={{top:viewPosition}} className="newPost-input createNewPost">
                    <div className="createNewPost-header">
                        <p>Créer un post</p>
                    <Button style={{border: "none", color:"#282828", textAlign: "end"}} onClick={props.toogleEditMode} action="X"/>
                    </div>    

                    <div className="postContent">
                        <input autoFocus className="postTitle" name={"title"} type={"text"} placeholder={"Donnez un titre à votre post"}
                       defaultValue={props.title} onChange={ (e) => props.setTitle(e.target.value)}></input>

                        <textarea placeholder="Écrivez ! Noircir le papier est idéal pour s'éclaircir l'esprit. -Aldous Huxley" defaultValue={props.text} className="postText" name="postText"
                        rows={10} onChange={ (e) => props.setText(e.target.value)}></textarea>

                        <input className="fileInput" type={"file"} name={"image"} id="image" accept="image/png, image/jpeg, image/jpg"
                        onChange={props.getFile} />
                        <label htmlFor="image"><FontAwesomeIcon icon={faUpload} /> Choisir un fichier</label>
                        {props.image.preview !==""
                            ? <img src={props.image.preview} alt="avatar" width='100' height='auto'/>
                            : "" }
                        <div className="altAttributeInput">
                            <label htmlFor="altAttributeInput">Décrivez l'image en quelque mots</label>
                            <input type="text" placeholder={"un court texte déscriptif"} defaultValue={props.caption} maxLength="50" onChange={ (e) => props.setCaption(e.target.value)}/>
                        </div>
                    </div>

                    <Button onClick={props.post} action="Poster" style={{color:"#0B5E9E"}} />
                </div>
        </div>
    )
}