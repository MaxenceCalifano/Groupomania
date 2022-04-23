import React from "react";
import "../css/avatar.css";


export default function Avatar(props) {
    const avatar = props.avatar === null ? "admin.png1649961381928.png" : props.avatar;
    return(
        <img className="avatar" src={`http://localhost:3000/images/${avatar}`} alt={props.altText}></img>
    )
}