import React from "react";
import "../css/button.css"

export default function Button(props) {
    /* const buttonStyle = {
        border: `2px solid ${props.color}`,
        borderRadius: "5px",
        backgroundColor: "transparent",
        color:`${props.color}`,
        cursor: "pointer",
        padding: "4px 9px",
    } */

    return (
        <button onClick={props.onClick} style={props.style} className="defaultButton">{props.action}</button>
    )
}