import { createGlobalStyle } from 'styled-components';

const colors = {
  dark: {
    bgc: "#231c2a",
    color: "white",
    navBgColor: "#5151516f",
    inputBgColor: "rgb(49, 49, 49)",
  },
  light: {
    bgc: "#f4f4f4",
    color: "#231c2a",
    navBgColor: "#e4e4e46f",
    inputBgColor: "#f4f4f4",
  },
};

export const Theme = createGlobalStyle`
  :root {
    --dark: ${colors.dark.bgc};
    --level2: #5bcdfc;
  }

  body {
    background-image: linear-gradient(
      ${(props) => (props.darkMode ? colors.dark.bgc : colors.light.bgc)},
      ${(props) => (props.darkMode ? "black" : "white")}
    );
    color: ${(props) => (props.darkMode ? colors.dark.color : colors.light.color)};
    button {
      cursor: pointer;
    }

    nav {
      background-color: ${(props) =>
    props.darkMode ? colors.dark.navBgColor : colors.light.navBgColor};
      .permissionTag {
        color: ${colors.dark.bgc};
      }
      .navigator {
        a.currentPage,
        a:hover {
          color: ${(props) =>
    props.darkMode ? colors.light.color : colors.dark.color};
        }
      }
    }
    .inputField > label span,
    svg.iconError {
      color: ${(props) => (props.darkMode ? "yellow" : "red")};
    }
    input,
    textarea {
      background-color: ${(props) =>
    props.darkMode ? colors.dark.inputBgColor : colors.light.inputBgColor};
      color: ${(props) => (props.darkMode ? colors.dark.color : colors.light.color)};
    }
    hr {
      border: 1px solid #a3a3a36f;
    }
    a {
      color: ${(props) => (props.darkMode ? "#fff" : "#201A1E")};
    }
    .profile-open {
      background-color: ${(props) => props.darkMode ? colors.dark.bgc : colors.light.bgc};
    }
  }
  .Card {
    .actions {
      a {
        color: #fff;
      }
    }
  }
  .CardPage {
    .textHeader {
      color: white;
    }
  }
`;
