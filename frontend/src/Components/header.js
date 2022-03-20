import React from "react";
import { useNavigate } from "react-router";
import '../css/header.css';
import icon from "../img/icon-left-font.png";
import Button from "./button";

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
    navigate("/login");
   }

   let button;
    if(props.isLoggedIn/* localStorage.getItem("loggedInUser") */) {
        button = <Button style={{color:"#F62C01"}} onClick={logout} action={"DÉCONNEXION"}/>
    } else {
        button = "";
    }

    return(
  
        <header>
            <a className="header-link" href="http://localhost:3001"> <img className="header-icon" src={icon} alt="logo de Groupomania"></img> </a>
            {button}
        </header>
    );
}