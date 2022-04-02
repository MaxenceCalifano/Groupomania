import React from "react";
import "../css/avatar.css";


export default function Avatar(props) {
    return(
        <img className="avatar" src={props.avatar} alt={props.altText}></img>
    )
}