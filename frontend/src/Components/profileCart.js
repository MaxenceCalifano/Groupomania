import React, { useState, useEffect } from "react";
import {Link } from "react-router-dom";
import '../css/profileCard.css';

export default function Profile(props) {
    const [avatar, setavatar] = useState();
    const [isHovered, setIsHovered] = useState(false);
   
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
        <div>
            <div className="profileCard"> 
         <Link to={"profile"} onMouseEnter={() =>setIsHovered(true)} onMouseLeave={() =>setIsHovered(false)}> 
        {avatar !== null ? <img className="avatar" src={`http://localhost:3000/images/${avatar}`} alt="avatar"></img> : ""}
        {isHovered ? 
            <div className="profileCard_options" >
                <p>Votre profil :</p>
                <p className="profileCard_options--profileLink">{props.username}</p>
            </div> 
            : ""
        }
            </Link>
        </div>
        </div>
        
    )
}