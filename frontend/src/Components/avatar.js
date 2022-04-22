import React from "react";
import "../css/avatar.css";


export default function Avatar(props) {
    return(
        <img className="avatar" src={`http://localhost:3000/images/${props.avatar}`} alt={props.altText}></img>
    )
}