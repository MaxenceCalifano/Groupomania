import React, { useState } from "react";

export default function SignInForm() {
    //const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setpassword] = useState();

    const signIn = (e) =>  {
        e.preventDefault();
        fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: email, password: password})
        })
        .then(() => console.log("vous êtes connecté"))
        .catch(() => console.log("Impossible de se connecter"))
    }
   
    return(
        <div>
            <h1>S'identifier</h1>
                <form>
                   {/*  <label htmlFor={"username"}>Entrez un nom d'utiliisateur</label>
                    <input type={"text"} name={"ussername"} onChange={(e) => setUsername(e.target.value)} ></input> */}

                    <label htmlFor={"email"}>Entrez votre adresse email</label>
                    <input type={"text"} name={"email"} onChange={(e) => setEmail(e.target.value)} ></input>
                    
                    <label htmlFor={"password"}>Entrez votre mot de passe</label>
                    <input type={"text"} name={"password"} onChange={(e) => setpassword(e.target.value)}></input>

                    <button onClick={signIn} >valider</button>
                </form>
        </div>
    );
}