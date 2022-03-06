import React from "react";
import '../css/post.css';


export default function post(props) {

    return (
        <div className="post">
            <h3>{props.title}</h3>
            <p>{props.text}</p> </div>
    );
}