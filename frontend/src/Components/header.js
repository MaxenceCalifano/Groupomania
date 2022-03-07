import React from "react";
import { useNavigate } from "react-router";

export default function Header(props) {

    const navigate =  useNavigate();

   const logout = () => {
    fetch("http://localhost:3000/api/auth/logout", { 
        method: "GET",
        credentials: "include",
    })
    props.changeLogState(props.isConnected);
    navigate("/login");
   }
   let button;
    if(props.isConnected) {
        button = <button onClick={logout} >Se déconnecter</button>
    }
    return(
  
        <header>
            <a href="http://localhost:3001"><h1>Groupomania</h1></a>
            {button}
            
        </header>
    );
}