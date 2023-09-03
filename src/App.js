// COMP
import React, { useState } from 'react';
import Router from './Router';
import AppBar from './components/AppBar/AppBar';
import './App.css';

// import 'bootstrap/dist/css/bootstrap.min.css';

export const userContext = React.createContext("")

export default function App() {

  const [isLogged, setIsLogged] = useState();
  const [user, setUser] = useState("");

  //check login status
  fetch(`https://api.shipap.co.il/login`, {
    credentials: 'include',
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return res.text().then(x => {
          throw new Error(x);
        });
      }
    })
    .then(data => {
      setIsLogged(true)
      setUser(data)
    })
    .catch(err => {
    });


  return (

    <userContext.Provider value={{ user, setUser, isLogged, setIsLogged }}>
      <div className="App">
        <AppBar />
        <div className="frame">
          <Router />
        </div>
      </div>
    </userContext.Provider>
  );
}