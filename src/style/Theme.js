import React from 'react'
import styled, { createGlobalStyle } from 'styled-components';


const colors = {

    // GLOBAL dark mode colors
    dark: {
        bgc: "#201A1E",
        color: "white",
    },

    // GLOBAL light mode colors
    light: {
        bgc: "white",
        color: "#201A1E",
    }
}

export const Theme = createGlobalStyle`

body {
  background-color: ${(props) => (props.darkMode ? colors.dark.bgc : colors.light.bgc)};
  color: ${(props) => (props.darkMode ? colors.dark.color : colors.light.color)};
  input,textarea{
    background-color:${(props) => (props.darkMode ? 'rgb(49, 49, 49)' : colors.light.bgc)};
    color: ${(props) => (props.darkMode ? colors.dark.color : colors.light.color)};
  }
    hr {
        border: 1px solid #a3a3a36f;
    }
   
    a {
        color: ${(props) => (props.darkMode ? '#fff' : "")};
    }

    // USER AREA //
    .profile-open {
        background-color: ${(props) => (props.darkMode ? colors.dark.bgc : colors.light.bgc)};
    }
}


.btnMode{
  color: ${(props) => (props.darkMode ? '#fff' : '#333')};
}
  
`
//example: ---!>   ${(props) => (props.darkMode ? '' : '')}!important;   <!----//
