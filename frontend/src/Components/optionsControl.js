import React, { useState } from "react";
import "../css/optionsControl.css"

export default function OptionsControl(props) {

    const [isInEditMode, setIsInEditMode] = useState(false);

    return(
        <div>
            <button className="optionsControl" onClick={() => setIsInEditMode(!isInEditMode)}>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </button>
            {isInEditMode ?
            <div className="optionsControl--options">
                <button onClick={() => {props.modify(); setIsInEditMode(false)}} >Modifier</button>
                <button onClick={() => {props.delete(); setIsInEditMode(false)}} >Supprimer</button>
            </div> : ""
        }
            
        </div>
    );
}