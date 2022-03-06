import './App.css';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Posts from './Components/Posts';
import Header from './Components/header';
import SignInForm from './Components/SignInForm';
import SignUp from './Components/SignUp';
import Login from './Components/Login';


import { useEffect, useState } from 'react';

function App() {

  
  return (
    <div className="App">
      <Header/>
        <Routes>
          
          <Route path='/' element={<Posts/>}>
          </Route>

          <Route path="login" element={<Login/>}>
            <Route path="signIn" element={<SignInForm/>}/>
            <Route path="signup" element={<SignUp/>}/>
          </Route>

          <Route path='*' element={ // En cas d'erreur d'URL
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
