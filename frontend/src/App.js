import './App.css';
import { Routes, Route} from 'react-router-dom';
import Posts from './Components/Posts';
import Header from './Components/header';
import SignInForm from './Components/SignInForm';
import SignUp from './Components/SignUp';
import Login from './Components/Login';


import { useState, useEffect } from 'react';
import Profile from './Components/profile';

function App() {
  const [username, setUsername] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check if user is loggedin and get his username
  useEffect(()=> {
    if(localStorage.getItem("loggedInUser")) {
      setIsLoggedIn(true);
      setUsername(localStorage.getItem("loggedInUser"))
    }
  }, [])
  
  return (
    <div className="App">
      <Header setUsername={setUsername} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>
        <Routes>
          <Route path='/' element={<Posts username={username} />}/>
         

          <Route path="login" element={<Login/>}>
            <Route path="signIn" element={<SignInForm setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />}/>
            <Route path="signup" element={<SignUp/>}/>
          </Route>

          <Route path='/profile' element={<Profile/>}/>

         
          {/*  En cas d'erreur d'URL */}
          <Route path='*' element={ 
            <main style={{ padding: "1rem" }}>
            <p>Oups il n'y a rien ici !</p>
          </main>
          }></Route>

      </Routes>
        
      {/* <nav>
      <Link to="signIn">Se déconnecter</Link>
      </nav>
      <Outlet/> */}

      
    </div>
  );
}

export default App;
