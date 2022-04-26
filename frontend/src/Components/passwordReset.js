import React, { useState, useEffect } from "react";
import InputWithvalidation from "./inputWithValidation";
import Button from "./button";


function PasswordReset() {

    const [email, setEmail] = useState("");
    const [validationIsDisabled, setValidationIsDisabled] = useState(true);
    const [responseMessage, setResponseMessage] = useState();
    const [inputsChecks, setInputsChecks] = useState({
            email: false,
        });
    
    function sendEmailAdress() {
        fetch('http://localhost:3000/api/auth/password-reset', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email})
        }).then( res => {
            if(res.ok) 
                setResponseMessage("Si cette adresse est associé à un compte existant alors un e-mail vient de lui être envoyé")           
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
        <div style={{padding: '5%'}}>
            <InputWithvalidation 
                label="email" 
                checks={["typeMismatch", "valueMissing"]} 
                inputProps={{type:"email" , required: true}}
                labelText="Entrez votre adresse e-mail"
                id="email"
                errorMessage="Veuillez renseigner une adresse e-mail valide"
                setValue={setEmail}
                setInputsChecks={setInputsChecks}
                inputsChecks = {inputsChecks}
            />

            <Button disabled={validationIsDisabled} className={"signupButton"} onClick={sendEmailAdress} action="Valider"/>
            <p>{responseMessage}</p>
        </div>
     );
}

export default PasswordReset;