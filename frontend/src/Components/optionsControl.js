import React, { useState } from "react";
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
                <button onClick={() => {props.modify(); setIsInEditMode(false)}} >Modifier</button>
                <button onClick={() => {props.delete(); setIsInEditMode(false)}} >Supprimer</button>
            </div> : ""
        }
            
        </div>
    );
}