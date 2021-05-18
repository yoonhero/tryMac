import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import Home from "./screens/Home";
import Layout from "./components/Layout";
import { HelmetProvider } from "react-helmet-async";
import { GlobalStyles, lightTheme } from "./styles";
import { ThemeProvider } from "styled-components";
import Auth from "./screens/Auth";
import { authService } from "./fbase"
import styled from "styled-components"
import { ImageLoad } from "./components/ImageLoad";

const LoadingPage = styled.div`
  width: 100vw;
  height: 100vh;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  img{
    width: 70px;
  }
`


function App() {
  const history = useHistory()
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const audio = new Audio("./bigsur.mp3")
  useEffect(() => {
    audio.play()
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setTimeout(() => setInit(true), 1000)
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });

  };

  return (

    <HelmetProvider>
      <ThemeProvider theme={ lightTheme } >
        <GlobalStyles />
        { init ? <Router>
          <Switch>
            <Route path="/" exact>
              <Layout>
                <Auth userObj={ userObj } />
              </Layout>

            </Route>

            <Route path="/home" exact>
              <Layout>
                <Home userObj={ userObj } />
              </Layout>

            </Route>

          </Switch>
        </Router> :
          <LoadingPage>
            <ImageLoad image={ "./applelogo.png" } />
          </LoadingPage> }

      </ThemeProvider>

    </HelmetProvider>

  );
}
export default App;
