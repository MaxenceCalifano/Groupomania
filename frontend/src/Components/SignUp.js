import React, { useState } from "react";
import '../css/homePageform.css';
import Button from "./button";

export default function SignUp() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setpassword] = useState();
    const [image, setImage] = useState({preview:"", data:""});
    const [message, setMessage] = useState();

    const getFile = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data:  e.target.files[0],
        }
        setImage(img);
    }
    
    const signUp = (e) =>  {
        e.preventDefault();

        let formData  = new FormData();
        formData.append('image', image.data)
        formData.append('username', username)
        formData.append('email', email)
        formData.append('password', password)


        fetch("http://localhost:3000/api/auth/signup", {
            method: "POST",
            body: formData,
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
                    <input className="input" type={"text"} name={"username"} onChange={(e) => setUsername(e.target.value)} ></input>

                    <label htmlFor={"email"}>Entrez votre adresse email</label>
                    <input className="input" type={"text"} name={"email"} onChange={(e) => setEmail(e.target.value)} ></input>
                    
                    <label htmlFor={"password"}>Entrez votre mot de passe</label>
                    <input className="input" type={"password"} name={"password"} onChange={(e) => setpassword(e.target.value)}></input>

                    <label htmlFor={"avatar"}>Chargez une photo de profile</label>
                    <input type={"file"} name={"image"} accept="image/png, image/jpeg, image/jpg"
                    onChange={getFile} ></input>
                    {<img src={image.preview} alt="avatar" width='100' height='auto'/>}
                    <Button className={"signupButton"} onClick={signUp} action="Créer un compte"/> 
                </form>
                <p>{message}</p>
        </div>
    );
}