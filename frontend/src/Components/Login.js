import React from "react";
import { Link, Outlet } from 'react-router-dom';

export default function Login() {

    return (
        <div>
            <nav>
            <Link to="signIn">Se connecter</Link>
            <Link to="signup">S'inscrire</Link>
        </nav>
        <Outlet/>
        </div>
        
    );
}