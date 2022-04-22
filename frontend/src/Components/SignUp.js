import React, { useEffect, useState } from "react";
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
    const [validationIsDisabled, setValidationIsDisabled] = useState(true);

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
        } else {
            setPasswordDifferenceMessage("")
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
        console.log(Object.values(inputsChecks).every(Boolean))
      
       if(Object.values(inputsChecks).every(Boolean)){
            setValidationIsDisabled(false);
       } else setValidationIsDisabled(true) 
        }     
    ,[inputsChecks] )
    return(
        <div>
            <h1>S'inscrire</h1>
                <form>
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

                   
                    
                   {/*  <label htmlFor={"password"}>Entrez votre mot de passe</label>
                    <input required className="input" type={"password"} name={"password"}  onChange={(e) => setpassword(e.target.value)} onBlur={checkPasswords}></input> */}
                   {/*  <label htmlFor={"repeatedPassword"}>Répétez le mot de passe</label>
                    <input  required className="input" type={"password"} name={"repeatedPassword"} onChange={(e) => setRepetedPassword(e.target.value)} onBlur={checkPasswords} ></input> */}
                    
                    <p className="passwordWarning">{passwordDifferenceMessage}</p>
                    
                    <PasswordStrengthMeter password={password} />
                    

                    <label htmlFor={"avatar"}>Chargez une photo de profil</label>

                    <input type={"file"} name={"image"} accept="image/png, image/jpeg, image/jpg"
                    onChange={getFile} ></input>
                    {image.preview !=="" ? <img src={image.preview} alt="avatar" width='100' height='auto'/>
                    : ""    
                }
                    <Button disabled={validationIsDisabled} className={"signupButton"} onClick={signUp} action="Créer un compte"/>
                </form>
                <p>{message}</p>
        </div>
    );
}