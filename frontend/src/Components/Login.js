import React from "react";
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Login() {

   const location = useLocation();

   // console.log(location.pathname) "/login/signup"
    return (
        <div>
            <nav>
                <Link className={"navLinkLeft navLinks " + (location.pathname === "/login/signup" ? "" : "navLinks--focus")} to="signIn">Se connecter</Link>
                <Link className={"navLinkRight navLinks " + (location.pathname === "/login/signup" ? "navLinks--focus" : "")} to="signup">S'inscrire</Link>
            </nav>
            <Outlet/>
        </div>
        
    );
}