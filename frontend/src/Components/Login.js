import React from "react";
import { Link, Outlet } from 'react-router-dom';

export default function Login() {

    return (
        <div>
            <nav>
                <Link className="navLinkLeft navLinks" to="signIn">Se connecter</Link>
                <Link className="navLinkRight navLinks" to="signup">S'inscrire</Link>
            </nav>
        <Outlet/>
        </div>
        
    );
}