import React, { useState, useEffect } from "react";
import '../css/profile.css';

export default function Profile() {
    const username = localStorage.getItem("loggedInUser");
    const [avatar, setavatar] = useState();

   
    useEffect(     
        () => {
            const getUser = () => {
                fetch(`http://localhost:3000/api/auth/${username}`, {
                method: "POST",
                headers: {"Content-Type": "application/json",},
                body: 
                    JSON.stringify({username: username})
                ,
                credentials: "include",
            })
                .then( res => res.json())
                .then(value => { 
                    fetch(`http://localhost:3000/images/${value.avatarUrl}`)
                    .then( res => res.blob())
                    .then( imageBlob =>  setavatar(URL.createObjectURL(imageBlob)))
                    } )
            };
            getUser()
        }, 
    //eslint-disable-next-line react-hooks/exhaustive-deps
    []   
    )
    return(
        <div className="profile">  
                <img className="avatar" src={avatar} alt="avatar"></img>
            <div>
            <a href={username}>Votre profil:</a>
            <p>{username}</p>
            </div>
        </div>
    )
}