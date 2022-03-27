import React, { useState, useEffect } from "react";
import '../css/profile.css';

export default function Profile() {
    const username = localStorage.getItem("loggedInUser");
    const [avatar, setavatar] = useState();

   
//const imageObjectURL = URL.createObjectURL(imageBlob);
    useEffect(
        
        () => {
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
            <p>{username}</p>
            <a href={username}>Profile</a>
            </div>
        </div>
    )
}