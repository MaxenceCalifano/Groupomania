import React, { useState } from "react";

function InputWithvalidation(props) {
    const [isValid, setIsValid] = useState(true);

    const checkValidty = (e) => {
        const { validity } = e.target;
        const checksPassed = props.checks.filter(check => validity[check]).length === 0;
        
        setIsValid(checksPassed);
    }
    return (
        <div className="inputWithValidation">
            <label htmlFor={props.id}>{props.labelText}</label>
            <input className="input" {...props.inputProps} onChange={(e) => props.setValue(e.target.value)} onBlur={checkValidty} />
             
             {isValid ? "" : <p className="input--warningMessage" >{props.errorMessage}</p>}
            
        </div>
     );
}

export default InputWithvalidation;