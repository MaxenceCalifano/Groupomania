import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import Button from "./button";
import "../css/profile.css";

function Profile(props) {

    const [username, setUsername] = useState();
    const [avatar, setavatar] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
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
    
    
    const modifyProfile = () => {
        fetch(`http://localhost:3000/api/auth/${props.username}`, {
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
        fetch('http://localhost:3000/api/auth/', {
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
                fetch(`http://localhost:3000/api/auth/private/${props.username}`, {
                credentials: "include",
            })
                .then( res => res.json())
                .then(value => {
                    
                        setavatar(value.result.avatarUrl)
                        setEmail(value.result.email)
                    
                    
                    /* const img = {
                        preview: URL.createObjectURL(value.result.avatarUrl),
                        image:""
                    }
                    setImage(img);*/
                    } ) 
            
        }
         //eslint-disable-next-line react-hooks/exhaustive-deps  
    )
    
    const navigate =  useNavigate()
    const logout = () => {
        fetch("http://localhost:3000/api/auth/logout", { 
            method: "GET",
            credentials: "include",
        })
        .then(() => {
            props.setIsLoggedIn(false);
            props.setUsername("");
            localStorage.removeItem("loggedInUser");
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

                <label htmlFor="username">Modifier votre pseudo</label>
                <input placeholder={props.username} onChange={(e) => setUsername(e.target.value)} type="text"></input>

                <label htmlFor="email">Modifier votre e-mail</label>
                <input onChange={(e) => setEmail(e.target.value)} placeholder={email} type="text"></input>

                <label htmlFor="password">Modifier votre mot de passe</label>
                <input onChange={(e) => setPassword(e.target.value)} placeholder="*********" type="password" autoComplete="new-password"></input>

                <input type={"file"} name={"image"} accept="image/png, image/jpeg, image/jpg" onChange={getFile}/>
                {image.preview !== "" ? <img src={image.preview} alt="avatar" width='100' height='auto'/> : "" } 
                
                <div>
                    <Button onClick={modifyProfile} action="Valider les modifications"/>
                    <Button onClick={() => setIsInEditMode(false)} action="Annuler les modifications"/>
                </div>
                

            </div>
            
            : // Not in edit mode
            <div>
            <p className="title">Votre Profil : </p>
            <p>Pseudo : {props.username}</p>   
            <p>e-mail : {email}</p>
            <p>********</p>   
            <span>Photo de profil : </span> {avatar !== undefined ? <img className="avatar" src={`http://localhost:3000/images/${avatar}`} alt="avatar"></img> :""}
            
            <div>
                <Button onClick={() => setIsInEditMode(true)} action="Modifier le profil"/>
                <Button className="logoutButton" onClick={logout} action={"Se déconnecter"}/>
            </div>
            

            <Button className="deleteButton" onClick={() => setDisplayWarning(true)} action={"Supprimer le compte"}/>

            {displayDeleteWarning ?
                <div>
                    <strong className="deleteWarning">Cette action est irréversible, voulez-vous vraiment supprimer votre compte Groupomania ?</strong>
                    <Button onClick={deleteProfile} action={"Oui, supprimer mon compte"}/>
                    <Button onClick={() => setDisplayWarning(false)} action={"Non, annuler la demande"}/>

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