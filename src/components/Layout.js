import ScriptTag from "react-script-tag/lib/ScriptTag";
import styled from "styled-components";
import { Header } from "./Header";

const Content = styled.main`
  margin: 0 auto;
  position: fixed;
  top:0;
  left:0;
  width: 100vw;
  background-image: url("./bigsur.png");
  height: 100vh;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Content>{ children }</Content>
    </>
  );
};

export default Layout;
