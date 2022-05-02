import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import InputWithvalidation from "./inputWithValidation";
import Button from "./button";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import BackToHomeLink from './BackToHomeLink'

function NewPassword() {

    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepetedPassword] = useState("");
    const [validationIsDisabled, setValidationIsDisabled] = useState(true);
    const [passwordDifferenceMessage, setPasswordDifferenceMessage] = useState();
    const [responseMessage, setResponseMessage] = useState();
    const [inputsChecks, setInputsChecks] = useState({
            password: false,
            repeatedPassword: false,
        });
    const checkPasswords = () => {
        if(password !== repeatedPassword) {
            setPasswordDifferenceMessage("Les mots de passe ne sont pas identiques");
        } else {
            setPasswordDifferenceMessage("")
        }
    }
    
    const {token} = useParams();
    const {id} = useParams();

    function createNewPassword() {
        fetch(`http://localhost:3001/api/auth/${token}/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password})
        }).then( res => {
            if(res.ok) 
                setResponseMessage("Votre mot de passe a été modifié correctement")           
        }).catch((err) => console.error(err));
    }

    useEffect( ()=>{    
        if(Object.values(inputsChecks).every(Boolean)){
            setValidationIsDisabled(false);
        } else {
            setValidationIsDisabled(true);
        }
        }     
    ,[inputsChecks])

    return ( 
        <div className="newPassword_container">
            <BackToHomeLink/>
            <h1>Choisissez un nouveau mot de passe :</h1>
            <InputWithvalidation 
                    label="password" 
                    checks={["valueMissing"]} 
                    inputProps={{type:"password" , required: true}}
                    labelText="Entrez un mot de passe"
                    id="password"
                    errorMessage="Veuillez renseigner un mot de passe"
                    setValue={setPassword}
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
            <p className="passwordWarning">{passwordDifferenceMessage}</p>        
            <PasswordStrengthMeter password={password} />

            <Button disabled={validationIsDisabled} className={"signupButton"} onClick={createNewPassword} action="Valider"/>
            <p>{responseMessage}</p>
        </div>
     );
}

export default NewPassword;