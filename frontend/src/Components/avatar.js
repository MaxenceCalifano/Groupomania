import React from "react";
import "../css/avatar.css";


export default function Avatar(props) {
    const avatar = props.avatar;
    return(
        <img className="avatar" src={`https://mc-groupomania.herokuapp.com/images/${avatar}`} alt={props.altText}></img>
    )
}