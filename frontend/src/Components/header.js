import React from "react";
import { useNavigate } from "react-router";

export default function Header(props) {
    console.log(localStorage.getItem("isLoggedIn"))
    const navigate =  useNavigate();

   const logout = () => {
    fetch("http://localhost:3000/api/auth/logout", { 
        method: "GET",
        credentials: "include",
    })
    localStorage.removeItem("isLoggedIn")
    navigate("/login");
   }

   let button;
    if(localStorage.getItem("isLoggedIn")) {
        button = <button onClick={logout} >Se déconnecter</button>
    }

    return(
  
        <header>
            <a href="http://localhost:3001"><h1>Groupomania</h1></a>
            {button}
            
        </header>
    );
}