import React, { useState, useEffect } from "react";


export default function Profile() {
    const username = localStorage.getItem("loggedInUser");
    const [avatar, setavatar] = useState();

    const getUser = () => {
        fetch(`http://localhost:3000/api/auth/${username}`, {
        credentials: "include",
    })
        .then( res => res.json())
        .then(value => { 
            fetch(`http://localhost:3000/images/${value.user[0].avatarUrl}`)
            .then( res => res.blob())
            .then( imageBlob =>  setavatar(URL.createObjectURL(imageBlob)))
            } )
    }
//const imageObjectURL = URL.createObjectURL(imageBlob);
    useEffect(
        () => getUser(),
        []
    )
    return(
        <div>
            <img src={avatar} width="50" alt="avatar"></img>
            <a href="">Profile</a>
        </div>
    )
}