import './App.css';
import { Routes, Route} from 'react-router-dom';
import Posts from './Components/Posts';
import Header from './Components/header';
import SignInForm from './Components/SignInForm';
import SignUp from './Components/SignUp';
import Login from './Components/Login';


import { useState } from 'react';

function App() {
  //Faire un était isConnected et le passer en props aux éléments qui en ont besoin comme header par ex
  
  const [isConnected, setIsConnected] = useState(false);

  function isLoggedIn(isConnected) {
    setIsConnected(!isConnected);
  }

  return (
    <div className="App">
      <Header isConnected={isConnected} changeLogState={isLoggedIn} />
        <Routes>
          
          <Route path='/' element={<Posts/>}>
          </Route>

          <Route path="login" element={<Login/>}>
            <Route path="signIn" element={<SignInForm isConnected={isConnected} changeLogState={isLoggedIn}/>}/>
            <Route path="signup" element={<SignUp/>}/>
          </Route>
         
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
