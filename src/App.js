import './App.css';
import { ColorModeContext, useMode } from './Theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
// import { tokens } from "./Theme"
import React, { useEffect, useState } from 'react';
import Login from './components/userArea/LoginClient';
import Cards from './components/card/Cards';

// export const recipesContext = createContext()
export const userContext = React.createContext("")

function App() {

  const [isLogged, setIsLogged] = useState();
  const [theme, colorMode] = useMode()
  const [user, setUser] = useState();
  const [cards, setCards] = useState([])

  // const colors = tokens(theme.palette.mode);


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


  //get all cards
  useEffect(() => {
    fetch(`https://api.shipap.co.il/cards?token=3aa43feb-35d3-11ee-b3e9-14dda9d4a5f0`)
      .then(res => res.json())
      .then(data => {
        setCards(data)
      });

  }, [])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <div className="frame">
            <CssBaseline />
            <userContext.Provider value={{ isLogged, setIsLogged }}>
              {!isLogged ? <Login /> : <p> {user.fullName} מחובר </p>}
            </userContext.Provider>
            <h1>אורי לוי</h1>
            {/* CARDS */}
            <section className='cards'>
              {cards.map(x => {
                return (
                  < Cards key={x.id} title={x.name} />
                )
              })}
            </section>
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
