import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { authService } from "../fbase";

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
`


const Bar = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  bottom: 0;
  padding: 5px;
background: rgba( 29, 31, 33, 0.25 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 5.5px );
-webkit-backdrop-filter: blur( 5.5px );
border-radius:15px;
border: 1px solid rgba( 255, 255, 255, 0.18 );

`

const hoverBar = keyframes`
   from {
    transform: translateY(0);
    }
    to {
      transform: translateY(-5px);
    }
`

const BarIcon = styled.div`
  margin: 0;
  margin-left: 4px;
  margin-right: 4px;
  margin-bottom: 6px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;

  img{
    width: 35px;
    &:hover{
    /* transform:scale(1.2); */
    /* animation: ${hoverBar} 0.2s; */
    transform: scale(1.1);
    margin-left: 5px;
  margin-right: 5px;

  }
  }
  
`
const Dot = styled.div`
  position: absolute;
  bottom: 3px;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: white;

`

const Home = ({ userObj }) => {
  const history = useHistory()
  useEffect(() => {
    if (userObj === null) {
      history.push("/")
    }
  }, [])
  return (
    <Main>
      <Bar>
        <BarIcon>
          <img src="./finder.png" />
          <Dot></Dot>
        </BarIcon>
        <BarIcon>
          <img src="./launchpad.png" />
        </BarIcon>
        <BarIcon>
          <img src="./memo.png" />
          <Dot></Dot>
        </BarIcon>

        <BarIcon>
          <img src="./terminal.png" />
        </BarIcon>
      </Bar>
    </Main>
  );
};

export default Home;