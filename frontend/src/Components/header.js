import React from "react";
import { useNavigate } from "react-router";
import '../css/header.css';
import icon from "../img/icon-left-font-monochrome-white.png";
import Button from "./button";
import Profile from "./profileCart";

export default function Header(props) {
  
    const navigate =  useNavigate();

   const logout = () => {
    fetch("http://localhost:3000/api/auth/logout", { 
        method: "GET",
        credentials: "include",
    })
    props.setIsLoggedIn(false)
    props.setUsername("")
    localStorage.removeItem("loggedInUser")
    navigate("/login/signIn");
   }

    return(
  
        <header>
            <a className="header-link" href="http://localhost:3001"> <img className="header-icon" src={icon} alt="logo de Groupomania"></img> </a>
           
            {
                props.isLoggedIn ?
                        <div className="userOptions">
                            <Profile/>
                            <Button className="logoutButton" onClick={logout} action={"DÉCONNEXION"}/>
                        </div>   
               :
                ""
                }
            
        </header>
    );
}