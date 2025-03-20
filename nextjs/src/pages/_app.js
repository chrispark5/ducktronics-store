import "@/styles/globals.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const betterTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#D2042D", //Red
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#000000",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#D2042D", //Red,
    },
    background: {
      light: "#eeeeee",
      medium: "#e0e0e0",
      dark: "#bdbdbd",
      white: "#ffffff",
      primary: "#D2042D", //Red
      paper: "#ffffff",
      default: "#ffffff",
    },
    typography: {
      allVariants: {
        fontFamily: "Montserrat, sans-serif",
        fontWeight: "700",
      },
      h1: {
        fontFamily: "Montserrat, sans-serif",
        fontWeight: "700",
      },
      h2: {
        fontFamily: "Montserrat, sans-serif",
        fontWeight: "700",
      },
      h3: {
        fontFamily: "Montserrat, sans-serif",
        fontWeight: "700",
      },
      h4: {
        fontFamily: "Montserrat, sans-serif",
        fontWeight: "700",
      },
      h5: {
        fontFamily: "Montserrat, sans-serif",
        fontWeight: "700",
      },
      h6: {
        fontFamily: "Montserrat, sans-serif",
        fontWeight: "700",
      },
      subtitle1: {
        fontFamily: "Roboto, sans-serif",
        fontWeight: "700",
      },
      subtitle2: {
        fontFamily: "Roboto, sans-serif",
        fontWeight: "700",
      },
      body1: {
        fontFamily: "Roboto, sans-serif",
      },
      body2: {
        fontFamily: "Roboto, sans-serif",
      },
      button: {
        fontFamily: "Montserrat, sans-serif",
        fontWeight: "700",
      },
      caption: {
        fontFamily: "Roboto, sans-serif",
      },
      overline: {
        fontFamily: "Roboto, sans-serif",
      },
    },
  },
});


export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={betterTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
