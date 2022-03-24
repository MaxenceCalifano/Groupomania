import React, { useState } from "react";
import '../css/homePageform.css';
import Button from "./button";

export default function SignUp() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setpassword] = useState();
    const [avatar, setAvatar] = useState();
    const [message, setMessage] = useState();
    
    const signUp = (e) =>  {
        e.preventDefault();
        fetch("http://localhost:3000/api/auth/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username: username, email: email, password: password, avatarUrl: avatar}),
        })
        .then((res) => {
                if(res.ok) {
                    setMessage("Votre compte à été créé !")
                } else {
                    setMessage("Le nom d'utilisateur ou l'adresse e-mail est déja utilisée")
                }
            })
        .catch((err) => console.error(err));
    }
   
    return(
        <div>
            <h1>S'inscrire</h1>
                <form>
                    <label htmlFor={"username"}>Entrez un nom d'utilisateur</label>
                    <input className="input" type={"text"} name={"ussername"} onChange={(e) => setUsername(e.target.value)} ></input>

                    <label htmlFor={"email"}>Entrez votre adresse email</label>
                    <input className="input" type={"text"} name={"email"} onChange={(e) => setEmail(e.target.value)} ></input>
                    
                    <label htmlFor={"password"}>Entrez votre mot de passe</label>
                    <input className="input" type={"password"} name={"password"} onChange={(e) => setpassword(e.target.value)}></input>

                    <label htmlFor={"avatar"}>Chargez une photo de profile</label>
                    <input type={"file"} name={"image"} accept="image/png, image/jpeg, image/jpg" enctype="multipart/form-data" formMethod="POST"
                    onChange={(e) => setAvatar(e.target.value)} ></input>

                    <Button className={"signupButton"} onClick={signUp} action="Créer un compte"/> 
                </form>
                <p>{message}</p>
        </div>
    );
}