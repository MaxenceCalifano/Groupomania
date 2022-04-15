import React from "react";
import "../css/button.css"

export default function Button(props) {

    return (
        <button disabled={props.disabled} className={`defaultButton ${props.className}`} onClick={props.onClick} style={props.style}>{props.action}</button>
    )
}