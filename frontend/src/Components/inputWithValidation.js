import React, { useState } from "react";

function InputWithvalidation(props) {
    const [isValid, setIsValid] = useState(true);
    
    // Execute checkPassword only when the component has the prop
    const checkPasswords = () => {
        if (props.checkPasswords !== undefined) {
           const checkPasswords = props.checkPasswords;
           checkPasswords();
        } else {
            return ""
        }
    }

    const checkValidty = (e) => {
        const { validity } = e.target;
        const checksPassed = props.checks.filter(check => validity[check]).length === 0;
        
        setIsValid(checksPassed);
        const inputsChecks = props.inputsChecks;
        const label = props.label
        inputsChecks[props.label] = checksPassed
        props.setInputsChecks({...inputsChecks, label: checksPassed})
    }
    return (
        <div className="inputWithValidation">
            <label htmlFor={props.id}>{props.labelText}</label>
            <input className="input" {...props.inputProps} onChange={(e) => props.setValue(e.target.value)} onBlur={(e) => {checkValidty(e);  checkPasswords()}} />
             
             {isValid ? "" : <p className="input--warningMessage" >{props.errorMessage}</p>}
            
        </div>
     );
}

export default InputWithvalidation;