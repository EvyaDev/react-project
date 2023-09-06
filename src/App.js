import React, { useEffect, useState } from 'react';
import Router from './Router';
import AppBar from './components/AppBar/AppBar';
import './App.css';

export const userContext = React.createContext("")
export const token = "3aa43feb-35d3-11ee-b3e9-14dda9d4a5f0"
export const RoleTypes = {
  none: 0,
  user: 1,
  business: 2,
  admin: 3,
}

export function checkPermission(perm, role) {
  return perm.includes(role);
}

export default function App() {

  const [isLogged, setIsLogged] = useState();
  const [user, setUser] = useState("");
  const [permission, setPermission] = useState(RoleTypes.none);

  //check login status
  useEffect(() => {
    fetch(`https://api.shipap.co.il/clients/login`, {
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
        setPermission(data.admin ? RoleTypes.admin : data.business ? RoleTypes.business : RoleTypes.user)
      })
      .catch(err => {

      });
  }, [])


  return (

    <userContext.Provider value={{ permission, setPermission, user, setUser, isLogged, setIsLogged }}>
      <div className="App">
        <AppBar />
        <div className="frame">
          <Router />
        </div>
      </div>
    </userContext.Provider>
  );
}