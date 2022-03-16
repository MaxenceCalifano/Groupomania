import React, { useState } from "react";
import { useNavigate } from "react-router";


export default function SignInForm(props) {
    //const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setpassword] = useState();

    let navigate = useNavigate();

    const signIn = (e) =>  {
        e.preventDefault();
        fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type": "application/json",
        },
            body: JSON.stringify({email: email, password: password})
        })
        .then((res) => {
                if(res.ok) { 
                    localStorage.setItem("isLoggedIn", true)
                    navigate("/")

                } else {
                    console.log("erreur");
                }
            }
        )
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
                    <input type={"password"} name={"password"} onChange={(e) => setpassword(e.target.value)}></input>

                    <button onClick={signIn} >valider</button>
                </form>
        </div>
    );
}