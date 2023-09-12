import React from 'react'
import styled, { createGlobalStyle } from 'styled-components';


const colors = {

    // GLOBAL dark mode colors
    dark: {
        bgc: "#221a2a",
        color: "white",
    },

    // GLOBAL light mode colors
    light: {
        bgc: "#f4f4f4",
        color: "#221a2a",
    }
}

export const Theme = createGlobalStyle`

body {
  background-color: ${(props) => (props.darkMode ? colors.dark.bgc : colors.light.bgc)};
  color: ${(props) => (props.darkMode ? colors.dark.color : colors.light.color)};

nav{
    background-color: ${(props) => (props.darkMode ? "#5151516f" : "#e4e4e46f")};
}


  input,textarea{
    background-color:${(props) => (props.darkMode ? 'rgb(49, 49, 49)' : colors.light.bgc)};
    color: ${(props) => (props.darkMode ? colors.dark.color : colors.light.color)};
  }
    hr {
        border: 1px solid #a3a3a36f;
    }
   
    a {
        color: ${(props) => (props.darkMode ? '#fff' : "#201A1E")};
    }

    // USER AREA //
    .profile-open {
        background-color: ${(props) => (props.darkMode ? colors.dark.bgc : colors.light.bgc)};
    }
}
.Card{
    .actions{
        a{
            color:#fff;
        }
    }
}
.CardPage{
    .textHeader{
        color:white;
    }
}

.btnMode{
  color: ${(props) => (props.darkMode ? '#fff' : '#333')};
}
  
`
//example: ---!>   ${(props) => (props.darkMode ? '' : '')}!important;   <!----//
