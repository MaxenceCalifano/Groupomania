import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import "../css/optionsControl.css"

export default function OptionsControl(props) {

    const [isInEditMode, setIsInEditMode] = useState(false);

    return(
        <div className="optionsControl" >
            <button className="optionsControl_dots" onClick={() => setIsInEditMode(!isInEditMode)}>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </button>
            {isInEditMode ?
            <div className="optionsControl_unfolded">
                <button className="optionsControl_unfolded--top" onClick={() => {props.modify(); setIsInEditMode(false)}} > <FontAwesomeIcon icon={faPenToSquare}/> Modifier</button>
                <button className="optionsControl_unfolded--bottom" onClick={() => {props.delete(); setIsInEditMode(false)}} > <FontAwesomeIcon icon={faTrashCan}/> Supprimer</button>
            </div> : ""
        }
            
        </div>
    );
}