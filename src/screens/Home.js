import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { authService } from "../fbase";
import { ImageLoad } from "../components/ImageLoad";
import Draggable, { DraggableCore } from 'react-draggable';
import { Resizable } from 'react-resizable';

const Main = styled.div`
  position: relative;
  overflow: auto;
  padding-top: 40px;
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

const FinderContent = styled.div`
  width: 50vw;

  display: ${props => props.finder ? "block" : "none"};
  animation: ${props => props.finder ? fadein : fadeout} 0.4s;
  -moz-animation: ${props => props.finder ? fadein : fadeout} 0.4s; /* Firefox */
  -webkit-animation: ${props => props.finder ? fadein : fadeout} 0.4s; /* Safari and Chrome */
  -o-animation: ${props => props.finder ? fadein : fadeout} 0.4s; 
  flex-direction: column;
  justify-content: center;
  align-items: center;

`
const FinderHeader = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  padding: 10px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: rgb(46,46,54);
  border-radius: 10px 10px 0 0; 
`

const Btn = styled.button`
  margin-right: 7px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  p{
    display: none;
  font-size: 8px;
  }
  &:hover{
    p{
      display: block;
    }
  }
  `
const Finder = styled.div`
  background-color: rgb(31,33,33);
  width: 100%;
height: 30vh;
  overflow: auto;
  display: flex;
  flex-direction: row;

  border-radius: 0 0 10px 10px;
`

const FinderSide = styled.div`
  height: 100%;
  width: 20%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 5px;
`

const SelectBar = styled.div`
  background-color: rgb(50,51,52);
  border-radius: 5px;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;

  img{
    width: 20px;
  }
  p{
    margin-left: 5px;
    font-size: 10px;
  }
`

const FinderMain = styled.div`
display: flex;
flex-direction: column;
width: 80%;
overflow: scroll;
`
const Files = styled.div`

width: 100%;
padding: 10px;
padding-left: 0;`
const File = styled.div`
  display: flex;
  width: 100%;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;

  color: white;
  background-color: ${props => props.num % 2 === 0 ? "rgb(24,26,26)" : "rgb(31, 33, 35)"};
  padding: 5px;
  img{
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
  p{
    font-size: 12px;

  }
`

const fadein = keyframes`
  from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`

const fadeout = keyframes`
from {
      opacity: 1;
  }
to {
      opacity: 0;
  }
  
`

const LaunchPad = styled.div`
  position: fixed;
  left:0;
  top: 0;
  display:${props => props.launchpad ? "grid" : "none"};
  grid-auto-rows: 150px;
  overflow: hidden;
  grid-gap: 20px;
  grid-template-columns: repeat(6, 1fr);
  @media only screen and (max-width: 800px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media only screen and (max-width: 700px) {
    grid-template-columns: repeat(4, 1fr);

  }
  @media only screen and (max-width: 500px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media only screen and (max-width: 420px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0px;
  }
  width: 100vw;
  height: 100vh;
  padding: 60px;


background: rgba( 66, 59, 59, 0.25 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 4px );
-webkit-backdrop-filter: blur( 4px );
animation: ${props => props.launchpad ? fadein : fadeout} 0.4s;
  -moz-animation: ${props => props.launchpad ? fadein : fadeout} 0.4s; /* Firefox */
  -webkit-animation: ${props => props.launchpad ? fadein : fadeout} 0.4s; /* Safari and Chrome */
  -o-animation: ${props => props.launchpad ? fadein : fadeout} 0.4s; /* Opera */

`
const LaunchPadIconContainer = styled.div`
display: flex;
flex-direction: column;
  justify-content: center;
  align-items: center;
  p{
    padding:15px;
    color: white;
    font-size: 18px;

  }
`
const LaunchPadIcon = styled.div`
 img{
    width: 90px;
    border-radius: 20%;

  }
`


const Home = ({ userObj }) => {
  const [disabled, setDisabled] = useState(true)
  const history = useHistory()
  const [activeDrags, setActiveDrags] = useState(0)
  const [launchpad, setLaunchpad] = useState(false)
  const [finder, setFinder] = useState(false)




  const onStart = () => {
    setActiveDrags(1);
  };

  const onStop = () => {
    setActiveDrags(0);
  };
  const dragHandlers = { onStart, onStop };

  useEffect(() => {
    if (userObj === null) {
      history.push("/")
    }
    const concernedElement = document.querySelector(".launchpad");
    document.addEventListener("mousedown", (e) => {

      if (concernedElement === e.target) {
        setLaunchpad(false)
      }
    });
    // document.querySelector(".finder").style.display = "none"
  }, [])


  return (
    <>
      <Main>

        <Draggable handle=".cursor" { ...dragHandlers } bounds="parent">

          <FinderContent finder={ finder }>

            <FinderHeader className="cursor">

              <Btn color="rgb(241,66,68)" onClick={ () => {
                setFinder(false)
              } }>
                <p>x</p>
              </Btn>
              <Btn color="rgb(243,176,39)" onClick={ () => {
                setFinder(false)
              } }>
                <p>-</p>
              </Btn>
              <Btn color="green">
                <p>~</p>
              </Btn>
            </FinderHeader>
            <Finder>
              <FinderSide>
                <SelectBar>
                  <ImageLoad image="./photoicon.png" />
                  <p>그림</p>
                </SelectBar>
              </FinderSide>
              <FinderMain>
                <Files>
                  <File num={ 0 }>
                    <ImageLoad image="./finder.png" />
                    <p>파인더.png</p>
                  </File>
                  <File num={ 1 }>
                    <ImageLoad image="./finder.png" />
                    <p>파인더.png</p>
                  </File>


                </Files>
              </FinderMain>

            </Finder>
          </FinderContent>



        </Draggable>

        <Bar>
          <BarIcon onClick={ () => {
            setFinder(true)
          } }>
            <ImageLoad image={ "./finder.png" } />

            { finder ? <Dot></Dot> : null }


          </BarIcon>
          <BarIcon onClick={ () => {
            setLaunchpad(true)
          } }>
            <ImageLoad image={ "./launchpad.png" } />

          </BarIcon>
          <BarIcon>
            <ImageLoad image={ "./memo.png" } />

            <Dot></Dot>
          </BarIcon>

          <BarIcon>
            <ImageLoad image={ "./terminal.png" } />

          </BarIcon>
        </Bar>
      </Main>
      <LaunchPad launchpad={ launchpad } className="launchpad">

        <LaunchPadIconContainer>
          <LaunchPadIcon onClick={ () => {
            setLaunchpad(false)
            setFinder(true)

          } }>
            <ImageLoad image="./finder.png" />
          </LaunchPadIcon>
          <p>finder</p>
        </LaunchPadIconContainer>
        <LaunchPadIconContainer>
          <LaunchPadIcon>
            <ImageLoad image="./memo.png" />
          </LaunchPadIcon>
          <p>메모</p>
        </LaunchPadIconContainer>
        <LaunchPadIconContainer>
          <LaunchPadIcon>
            <ImageLoad image="./terminal.png" />
          </LaunchPadIcon>
          <p>Terminal</p>
        </LaunchPadIconContainer>



      </LaunchPad>


    </>
  );
};

export default Home;