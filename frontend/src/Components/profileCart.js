import React, { useState, useEffect } from "react";
import {Link } from "react-router-dom";
import '../css/profileCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown} from '@fortawesome/free-solid-svg-icons';

export default function Profile(props) {
    const [avatar, setavatar] = useState();
    const [isHovered, setIsHovered] = useState(false);
   
    useEffect(     
        () => {       
                fetch(`http://localhost:3001/api/auth/${props.username}`, {
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
            <Link className="profileCard_link" to={"profile"}  
                onFocus= {() => setIsHovered(true)} 
                onMouseEnter={() =>setIsHovered(true)}
                onMouseLeave={() =>setIsHovered(false)}
                onBlur={() =>setIsHovered(false)} 
                >
            <div className="profileCard_notHovered">
                <FontAwesomeIcon icon={faChevronDown}  className="profileCard_icon"/>
                {avatar !== undefined ? <img className="avatar" src={`http://localhost:3001/images/${avatar}`} alt="avatar"></img> : ""}
            </div>
                <div className={isHovered ? "profileCard_options" : "profileCard_notDisplayed"}
                    >
                    <p>Votre profil :</p>
                    <p className="profileCard_options--profileLink">{props.username}</p>
                </div> 
                
            </Link>
        </div>
        </div>
        
    )
}