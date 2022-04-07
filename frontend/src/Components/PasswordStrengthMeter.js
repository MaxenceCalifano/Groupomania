import React from "react";
import zxcvbn from 'zxcvbn';
import "../css/passwordStrengthMeter.css"


export default function PasswordStrengthMeter(props) {
    const password = props.password
    const testedPassword = zxcvbn(password);

    const createPasswordLabel = (result) => {
        switch (result.score) {
        case 0:
            return 'Très faible';
        case 1:
            return 'Faible';
        case 2:
            return 'Moyen';
        case 3:
            return 'Fort';
        case 4:
            return 'Très fort';
        default:
            return 'Weak';
        }
    }
    return ( 
        <div className="password-strength-meter">
            <label>
                <strong>Force du mot de passe:</strong> {createPasswordLabel(testedPassword)}
            </label>
            <progress className={`password-strength-meter-progress strength-${createPasswordLabel(testedPassword)}`}
                        value={testedPassword.score} max="4" />
            
            
        </div>
     );
}