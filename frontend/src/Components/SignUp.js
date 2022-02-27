import React, { useState } from "react";

export default function SignUp() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setpassword] = useState();
    const [avatar, setAvatar] = useState();

    const signUp = (e) =>  {
        e.preventDefault();
        fetch("http://localhost:3000/api/auth/signUp", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username: username, email: email, password: password, avatarUrl: avatar})
        })
        .then(() => console.log("vous êtes connecté"))
        .catch(() => console.log("Impossible de se connecter"))
    }
   
    return(
        <div>
            <h1>S'inscrire</h1>
                <form>
                    <label htmlFor={"username"}>Entrez un nom d'utilisateur</label>
                    <input type={"text"} name={"ussername"} onChange={(e) => setUsername(e.target.value)} ></input>

                    <label htmlFor={"email"}>Entrez votre adresse email</label>
                    <input type={"text"} name={"email"} onChange={(e) => setEmail(e.target.value)} ></input>
                    
                    <label htmlFor={"password"}>Entrez votre mot de passe</label>
                    <input type={"text"} name={"password"} onChange={(e) => setpassword(e.target.value)}></input>

                    <label htmlFor={"avatar"}>Chargez une photo de profile</label>
                    <input type={"file"} name={"avatar"} accept={"image/png, image/jpeg, image/jpg"}
                    onChange={(e) => setAvatar(e.target.value)} ></input>

                    <button onClick={signUp} >valider</button>
                </form>
        </div>
    );
}