import React from "react";
import Button from "./button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import '../css/postModal.css';

export default function PostModale(props) {

    const viewPosition = window.scrollY + 30;
    return (
        <div>
                <div style={{top:viewPosition}} className="newPost-input createNewPost">
                    <div className="createNewPost-header">
                        <p>{props.actionText}</p>
                    <FontAwesomeIcon className="closeButton" icon={faCircleXmark} onClick={props.toogleEditMode}/>
                    </div>    

                    <div className="postContent">
                        <input autoFocus className="postTitle" name={"title"} type={"text"} placeholder={"Donnez un titre à votre post"}
                       defaultValue={props.title} onChange={ (e) => props.setTitle(e.target.value)}></input>

                        <textarea placeholder="Écrivez ! Noircir le papier est idéal pour s'éclaircir l'esprit. -Aldous Huxley" defaultValue={props.text} className="postText" name="postText"
                        rows={7} onChange={ (e) => props.setText(e.target.value)}></textarea>
                        <hr style={{width:'50%'}}/>
                        <div className="altAttributeInput">
                            <label htmlFor="altAttributeInput">Décrivez l'image en quelque mots :</label>
                            <input type="text" placeholder={"un court texte déscriptif"} defaultValue={props.caption} maxLength="50" onChange={ (e) => props.setCaption(e.target.value)}/>
                        </div>

                        <input className="fileInput" type={"file"} name={"image"} id="image" accept="image/png, image/jpeg, image/jpg"
                        onChange={props.getFile} />
                        <label htmlFor="image"><FontAwesomeIcon icon={faUpload} /> Choisir un fichier</label>
                        {props.image.preview !==""
                            ? <img src={props.image.preview} alt="avatar" width='100' height='auto'/>
                            : "" }
                    </div>

                    <Button onClick={props.post} action="Poster" className="modalButton" />
                </div>
        </div>
    )
}