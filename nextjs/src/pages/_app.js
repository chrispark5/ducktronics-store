import "@/styles/globals.css";
import "@/styles/DuckHunt.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@/blocks/Animations/ImageTrail/ImageTrail.css";
import Layout from "@/components/Layout";
import "@/blocks/Components/FlowingMenu/FlowingMenu.css";
import "@/blocks/TextAnimations/RotatingText/RotatingText";
import "@/blocks/TextAnimations/RotatingText/RotatingText.css";
const betterTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00BFFF", //Pond Blue
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#000000",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#A9A9A9", //Tech Gray
      secondary: "#ffffff",
    },
    background: {
      light: "#eeeeee",
      medium: "#e0e0e0",
      dark: "#bdbdbd",
      white: "#ffffff",
      primary: "#00BFFF", //Red
      paper: "#ffffff",
      default: "#ffffff",
    },
    // typography: {
    //   allVariants: {
    //     fontFamily: "Montserrat, sans-serif",
    //     fontWeight: "700",
    //   },
    //   h1: {
    //     fontFamily: "Montserrat, sans-serif",
    //     fontWeight: "700",
    //   },
    //   h2: {
    //     fontFamily: "Montserrat, sans-serif",
    //     fontWeight: "700",
    //   },
    //   h3: {
    //     fontFamily: "Montserrat, sans-serif",
    //     fontWeight: "700",
    //   },
    //   h4: {
    //     fontFamily: "Montserrat, sans-serif",
    //     fontWeight: "700",
    //   },
    //   h5: {
    //     fontFamily: "Montserrat, sans-serif",
    //     fontWeight: "700",
    //   },
    //   h6: {
    //     fontFamily: "Montserrat, sans-serif",
    //     fontWeight: "700",
    //   },
    //   subtitle1: {
    //     fontFamily: "Roboto, sans-serif",
    //     fontWeight: "700",
    //   },
    //   subtitle2: {
    //     fontFamily: "Roboto, sans-serif",
    //     fontWeight: "700",
    //   },
    //   body1: {
    //     fontFamily: "Roboto, sans-serif",
    //   },
    //   body2: {
    //     fontFamily: "Roboto, sans-serif",
    //   },
    //   button: {
    //     fontFamily: "Montserrat, sans-serif",
    //     fontWeight: "700",
    //   },
    //   caption: {
    //     fontFamily: "Roboto, sans-serif",
    //   },
    //   overline: {
    //     fontFamily: "Roboto, sans-serif",
    //   },
    // },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <ThemeProvider theme={betterTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Layout>
  );
}
