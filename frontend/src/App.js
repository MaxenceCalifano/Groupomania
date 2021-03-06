import { Routes, Route} from 'react-router-dom';
import Posts from './Components/Posts';
import Header from './Components/header';
import SignInForm from './Components/SignInForm';
import SignUp from './Components/SignUp';
import Login from './Components/Login';


import { useState, useEffect } from 'react';
import Profile from './Components/profile';
import PasswordReset from './Components/passwordReset';
import NewPassword from './Components/NewPassword';

function App() {
  const [username, setUsername] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check if user is loggedin get his username
  useEffect(()=> {
    if(localStorage.getItem("loggedInUser")) {
      setIsLoggedIn(true);
      setUsername(localStorage.getItem("loggedInUser"))
    }
  },[])
  
  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn}  setUsername={setUsername} username={username}/>
        <Routes>
          <Route path='/' element={<Posts username={username} />}/>
         
          <Route path='profile' element={<Profile username={username} setUsername={setUsername} setIsLoggedIn={setIsLoggedIn}/>}/>

          <Route path="login" element={<Login/>}>
            <Route path="signIn" element={<SignInForm setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />}/>
            <Route path="signup" element={<SignUp/>}/>
          </Route>

          <Route path='password-reset' element={<PasswordReset/>}/>
          <Route path="reset-password/:token/:id" element={<NewPassword/>}/>
         
          {/*  En cas d'erreur d'URL */}
          <Route path='*' element={ 
            <main style={{ padding: "1rem" }}>
            <p>Oups il n'y a rien ici !</p>
          </main>
          }></Route>

      </Routes>
        
  
    </div>
  );
}

export default App;
