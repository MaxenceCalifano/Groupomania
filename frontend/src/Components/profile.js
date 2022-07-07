import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

import InputWithvalidation from "./inputWithValidation";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import Button from "./button";
import BackToHomeLink from "./BackToHomeLink";
import "../css/profile.css";


function Profile(props) {
    
    const [username, setUsername] = useState();
    const [avatar, setavatar] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepetedPassword] = useState("");
    const [passwordDifferenceMessage, setPasswordDifferenceMessage] = useState();
    const [image, setImage] = useState({preview:"", data:""});
    const [isInEditMode, setIsInEditMode] = useState(false);
    const [displayDeleteWarning, setDisplayWarning] = useState(false);
    const [userDeletedMessage, setUserDeletedMessage] = useState();

    const getFile = (e) => {
            const img = {
                preview: URL.createObjectURL(e.target.files[0]),
                data:  e.target.files[0],
            }
            setImage(img);
        }

    let formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', image.data);
    
    const checkPasswords = () => {
        if(password !== repeatedPassword) {
            setPasswordDifferenceMessage("Les mots de passe ne sont pas identiques");
        } else {
            setPasswordDifferenceMessage("")
        }
    }
    
    const modifyProfile = () => {
        fetch(`https://mc-groupomania.herokuapp.com/api/auth/${props.username}`, {
            method: "PUT",
            credentials: "include",
            body: formData,
        })
            .then( resp => resp.json())
            .then( value => {
                if(value.username !== undefined) {
                props.setUsername(value.username)
                localStorage.setItem("loggedInUser", value.username)
                }
                setIsInEditMode(false);
            })

    }
    const deleteProfile = () => {
        fetch('https://mc-groupomania.herokuapp.com/api/auth/', {
            method: "DELETE",
            credentials: "include",
        })
            .then( resp =>  {
                if (resp.ok) {
                    function goToSignup() {
                        logout() // remove cookie and localStorage  
                        navigate("/login/signUp")
                    }
                    setUserDeletedMessage("Votre compte a été supprimé, vous allez être redirigé vers la page d'inscription");
                    setTimeout(goToSignup, 5000)
                }
      
            })
    }

    useEffect(     
        () => {       
                fetch(`https://mc-groupomania.herokuapp.com/api/auth/private/${props.username}`, {
                credentials: "include",
            })
                .then( res => res.json())
                .then(value => {
                        setavatar(value.result.avatarUrl)
                        setEmail(value.result.email)
                    } ) 
            
        },//eslint-disable-next-line react-hooks/exhaustive-deps
         []
    )
    
    const navigate =  useNavigate()
    const logout = () => {
        fetch("https://mc-groupomania.herokuapp.com/api/auth/logout", { 
            method: "GET",
            credentials: "include",
        })
        .then(() => {
            props.setIsLoggedIn(false);
            props.setUsername("");
            localStorage.removeItem("loggedInUser");
            localStorage.removeItem("privilege");
            navigate("/login/signIn");
        })
       }

    return ( 
        <div className="profile" >
            {userDeletedMessage !== undefined ? <p>{userDeletedMessage}</p>
            :
            <div>
            {isInEditMode ?
            <div className="editProfile">

                <p className="title">Modifier votre Profil : </p>

                <label htmlFor="username">Modifier votre pseudo :</label>
                <input className="input" placeholder={props.username} onChange={(e) => setUsername(e.target.value)} type="text"></input>

                <label htmlFor="email">Modifier votre e-mail :</label>
                <input className="input" onChange={(e) => setEmail(e.target.value)} placeholder={email} type="text"></input>
                
                <InputWithvalidation 
                    label="password" 
                    checks={["valueMissing"]} 
                    inputProps={{type:"password" , required: true}}
                    labelText="Modifier votre mot de passe"
                    id="password"
                    errorMessage="Veuillez renseigner un mot de passe"
                    setValue={setPassword}MeterPasswordStrengthMeter
                    checkPasswords= {checkPasswords}
                    style={{alignItems: 'flex-start'}}
                    />

                <InputWithvalidation 
                    label="repeatedPassword" 
                    checks={["valueMissing"]} 
                    inputProps={{type:"password" , required: true}}
                    labelText="Répétez le mot de passe"
                    id="password"
                    errorMessage="Veuillez répeter le mot de passe"
                    setValue={setRepetedPassword}MeterPasswordStrengthMeter
                    checkPasswords= {checkPasswords}
                    style={{alignItems: 'flex-start'}}
                />
                <p className="passwordWarning">{passwordDifferenceMessage}</p>        
                <PasswordStrengthMeter password={password} />
                <p>Changer de photo de profile:</p>
                <input className="fileInput" type={"file"} name={"image"} id="image" accept="image/png, image/jpeg, image/jpg" onChange={getFile}/>
                <label htmlFor="image"><FontAwesomeIcon icon={faUpload} /> Choisir un fichier</label>

                {image.preview !== "" ? <img src={image.preview} alt="avatar" width='100' height='auto'/> : "" } 
                
                <div className="profile_buttonsContainer">
                    <Button className="modifyProfileButton" onClick={modifyProfile} action="Valider les modifications"/>
                    <Button className="cancelModificationsButton" onClick={() => setIsInEditMode(false)} action="Annuler les modifications"/>
                </div>
                

            </div>
            
            : // Not in edit mode
            <div className="profile_notInEditMode">
            <p className="title">Votre Profil : </p>
            <p><span className="profile-bold">Pseudo :</span> {props.username}</p>   
            <p><span className="profile-bold">e-mail :</span> {email}</p>
            <span className="showAvatar"><span className="profile-bold">Photo de profil :  </span>{avatar !== undefined ? <img className="avatar" src={`http://localhost:3001/images/${avatar}`} alt="avatar"></img> :""}</span>
            
            <div>
                <Button className="modifyProfileButton" onClick={() => setIsInEditMode(true)} action="Modifier le profil"/>
                <Button className="logoutButton" onClick={logout} action={"Se déconnecter"}/>
            </div>
            <BackToHomeLink/>

            <Button className="deleteButton" onClick={() => setDisplayWarning(true)} action={"Supprimer le compte"}/>

            {displayDeleteWarning ?
                <div className="deleteWarning_container">
                    <strong className="deleteWarning">Cette action est irréversible, voulez-vous vraiment supprimer votre compte Groupomania ?</strong>
                    <Button className="cancelDeleteButton" onClick={() => setDisplayWarning(false)} action={"Non, annuler la demande"}/>
                    <Button className="deleteButton" onClick={deleteProfile} action={"Oui, supprimer mon compte"}/>
                </div>      
                :
                ""
        }

            </div>
        }        
            </div>
        }
            
</div>
     );
}

export default Profile;