import React from "react";
import '../css/header.css';
import icon from "../img/icon-left-font-monochrome-white.png";
import ProfileCart from "./profileCart";

export default function Header(props) {
  

    return(
  
        <header>
            <div className="header_container">
            <a className="header-link" href="http://localhost:3000"> <img className="header-icon" src={icon} alt="logo de Groupomania"></img> </a>
           
           {
               props.isLoggedIn ?
                       <div className="userOptions">
                           <ProfileCart username={props.username}/>
                           
                       </div>   
              :
               ""
               }
            </div>    
        </header>
    );
}