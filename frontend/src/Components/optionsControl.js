import React, { useState } from "react";
import "../css/optionsControl.css"

export default function OptionsControl(props) {

    const [isInEditMode, setIsInEditMode] = useState(false);

    return(
        <div>
            <div className="optionsControl" onClick={() => setIsInEditMode(!isInEditMode)}>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
            {isInEditMode ?
            <div className="optionsControl--options">
                <button onClick={props.modify} >Modifier</button>
                <button onClick={props.delete} >Supprimer</button>
            </div> : ""
        }
            
        </div>
    );
}