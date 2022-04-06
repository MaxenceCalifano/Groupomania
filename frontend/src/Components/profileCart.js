import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import '../css/profileCart.css';

export default function Profile() {
    const username = localStorage.getItem("loggedInUser");
    const [avatar, setavatar] = useState();

   
    useEffect(     
        () => {       
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
                    setavatar(value.avatarUrl)
                   /*  fetch(`http://localhost:3000/images/${value.avatarUrl}`)
                    .then( res => res.blob())
                    .then( imageBlob =>  setavatar(URL.createObjectURL(imageBlob))) */
                    } )
            
        }, 
    //eslint-disable-next-line react-hooks/exhaustive-deps
      
    )
    return(
        <div className="profile">  
                <img className="avatar" src={`http://localhost:3000/images/${avatar}`} alt="avatar"></img>
            <div>
                <Link to={"/profile"}>Votre profil :</Link>
            <p>{username}</p>
            <Routes>
        <Route path='/' ></Route>
    
        </Routes>
            </div>
        </div>
    )
}