import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import '../css/homePageform.css';
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import Button from "./button";
import InputWithvalidation from "./inputWithValidation";

export default function SignUp() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setpassword] = useState("");
    const [repeatedPassword, setRepetedPassword] = useState();
    const [image, setImage] = useState({preview:"", data:""});
    const [message, setMessage] = useState();
    const [passwordDifferenceMessage, setPasswordDifferenceMessage] = useState();
    const [passwordStrengthMessage, setPasswordStrengthMessage] = useState();
    const [validationIsDisabled, setValidationIsDisabled] = useState(true);
    const [passwordSecurityLevel, setPasswordSecurityLevel] = useState();


    const [inputsChecks, setInputsChecks] = useState({
        username: false,
        email: false,
        password: false,
        repeatedPassword: false,
    });



    const getFile = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data:  e.target.files[0],
        }
        setImage(img);
    }
    
    const checkPasswords = () => {
        if(password !== repeatedPassword) {
            setPasswordDifferenceMessage("Les mots de passe ne sont pas identiques");
        } else if(passwordSecurityLevel < 2) {
            setPasswordStrengthMessage("Votre mot de passe est trop faible nous vous recommandons d'inclure au moins une majuscule et un caractère spécial")
            setPasswordDifferenceMessage("")
        } else {
            setPasswordStrengthMessage("");
            setPasswordDifferenceMessage("");    
        }
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
   
    useEffect( ()=>{
       
      //Check if all required inputs are populated
       if(Object.values(inputsChecks).every(Boolean) && passwordDifferenceMessage === ""){
           if(passwordSecurityLevel < 2) {
            setValidationIsDisabled(true);
           } else
            setValidationIsDisabled(false);
       } else setValidationIsDisabled(true) 
        }     
    ,//eslint-disable-next-line react-hooks/exhaustive-deps
    [inputsChecks] )
    return(
        <div className="signInUp">
            <h1>S'inscrire</h1>
                
                <form className="form">
                <InputWithvalidation 
                    label="username" 
                    checks={["valueMissing"]} 
                    inputProps={{type:"text", required: true}}
                    labelText="Entrez un nom d'utilisateur"
                    id="username"
                    errorMessage="Veuillez choisir un nom d'utilisateur"
                    setValue={setUsername}
                    setInputsChecks={setInputsChecks}
                    inputsChecks = {inputsChecks}
                    />
                
                <InputWithvalidation 
                    label="email" 
                    checks={["typeMismatch", "valueMissing"]} 
                    inputProps={{type:"email" , required: true}}
                    labelText="Entrez votre adresse email"
                    id="email"
                    errorMessage="Veuillez renseigner une adresse e-mail valide"
                    setValue={setEmail}
                    setInputsChecks={setInputsChecks}
                    inputsChecks = {inputsChecks}
                />

                <InputWithvalidation 
                    label="password" 
                    checks={["valueMissing"]} 
                    inputProps={{type:"password" , required: true}}
                    labelText="Entrez un mot de passe"
                    id="password"
                    errorMessage="Veuillez renseigner un mot de passe"
                    setValue={setpassword}
                    setInputsChecks={setInputsChecks}
                    inputsChecks = {inputsChecks}
                    checkPasswords= {checkPasswords}
                />
                <InputWithvalidation 
                    label="repeatedPassword" 
                    checks={["valueMissing"]} 
                    inputProps={{type:"password" , required: true}}
                    labelText="Répétez le mot de passe"
                    id="password"
                    errorMessage="Veuillez répeter le mot de passe"
                    setValue={setRepetedPassword}
                    setInputsChecks={setInputsChecks}
                    inputsChecks = {inputsChecks}
                    checkPasswords= {checkPasswords}
                />

                    {passwordDifferenceMessage ? <p className="passwordWarning">{passwordDifferenceMessage}</p> : "" }
                    {passwordStrengthMessage ? <p className="passwordWarning">{passwordStrengthMessage}</p> : "" }
                   
                    <PasswordStrengthMeter password={password} checkSecurity={setPasswordSecurityLevel}/>
                    

                <label htmlFor={"avatar"}>Chargez une photo de profil</label>

                <input className="fileInput" type={"file"} name={"image"} id="image" accept="image/png, image/jpeg, image/jpg" onChange={getFile}/>
                <label htmlFor="image"><FontAwesomeIcon icon={faUpload} /> Choisir un fichier</label>
                    {image.preview !=="" ? <img src={image.preview} alt="avatar" width='100' height='auto'/>
                    : ""    
                }
                    <p className="signupMessage">{message}</p>
                    <Button disabled={validationIsDisabled} className={"signupButton"} onClick={signUp} action="Créer un compte"/>
                </form>
        </div>
    );
}