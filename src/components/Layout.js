import React, { useState, useEffect } from "react"
import ScriptTag from "react-script-tag/lib/ScriptTag";
import styled from "styled-components";
import { Header } from "./Header";

const Content = styled.main`
  margin: 0 auto;
  position: fixed;
  top:0;
  left:0;
  width: 100vw;

  height: 100vh;
`;

const Layout = ({ children }) => {
  const [sourceLoaded, setSourceLoaded] = useState(null)
  const [src, setSrc] = useState("./bigsur.png")
  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => setSourceLoaded(src)
  }, [src])
  return (
    <>
      <Header />
      <Content style={ { backgroundImage: `url(${sourceLoaded})` } }>{ children }</Content>
    </>
  );
};

export default Layout;
