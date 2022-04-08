import React, { useState, useEffect } from "react";
import {Link } from "react-router-dom";
import '../css/profileCart.css';

export default function Profile(props) {
    const [avatar, setavatar] = useState();

   
    useEffect(     
        () => {       
                fetch(`http://localhost:3000/api/auth/${props.username}`, {
                credentials: "include",
            })
                .then( res => res.json())
                .then(value => { 
                    setavatar(value.avatarUrl)
                    } )
            
        }, [props.username]
    //eslint-disable-next-line react-hooks/exhaustive-deps
      
    )
    return(
        <div className="profile">  
        {avatar !== undefined ? <img className="avatar" src={`http://localhost:3000/images/${avatar}`} alt="avatar"></img> : ""}
                
            <div>
                <Link to={"profile"}>Votre profil :</Link>
            <p>{props.username}</p>
            
            </div>
        </div>
    )
}