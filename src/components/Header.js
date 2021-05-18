import React, { useEffect, useState } from "react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { ImageLoad } from "./ImageLoad";

const SHeader = styled.header`
position:fixed;
  top: 0;
  left:0;
  width: 100%;
  background-color: rgb(131, 200, 255);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 15;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div`
  font-size: 20px;
  margin-left: 15px;
  margin-right: 15px;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

`

const Clock = styled.p`
  font-size: 14px;
  margin-right: 10px;
`

const Icon = styled.span`
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-left: 15px;
  img {
    width: 20px;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.p`
  font-size: 20px;
  font-family: "Ubuntu", sans-serif;
  font-weight: 300;
`;

const Infomation = styled.div`
  position: absolute;
  top: 60px;
  left: 10px;
  z-index: 10;
  max-width: 200px;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.3);
  background-color: rgba(255, 255, 255, 0.9);
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-bottom-color: rgba(255, 255, 255, 0.9);
    border-top: 0;
    margin-left: 5px;
    margin-top: -20px;
    left: 0;
    top: 0;
  }
  h1 {
    font-family: "Nanum", sans-serif;
    font-weight: 500;
    font-size: 16px;
  }
  p {
    font-family: "Nanum", sans-serif;
    font-weight: 400;
  }
`;

const Battery = styled.div`
  border: 3px solid #333;
  width: 18px;
  height: 28px;
  padding: 2px;
  border-radius: 4px;
  position: relative;

  transform: rotate(90deg) scale(0.7) translateX(-1px);
  &::before {
    content: '';
    height: 3px;
    width: 12px;
    background: #333;
    display: block;
    position: absolute;
    top: -6px;
    left: 0px;
    border-radius: 4px 4px 0 0;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;

    left: 0px;
    bottom: -1px;
    border: 1px solid #fff;
    border-radius: 2px;
    width: 80%;
    height: ${props => `${props.battery * 100}%`};
    background-color: black;

  }
`


export const Header = () => {
  const [battery, setBattery] = useState(0.8);
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState()
  const [minutes, setMinutes] = useState()
  const [seconds, setSeconds] = useState()
  useEffect(() => {
    setInterval(() => {
      setDate(new Date())
    }, 1000)
  }, [])
  useEffect(() => {
    setHours(date.getHours())
    setMinutes(date.getMinutes())
    setSeconds(date.getSeconds())
  }, [date])
  // let batteryPromise = navigator.getBattery();
  // batteryPromise.then(batteryCallback);

  // function batteryCallback(batteryObject) {
  //   printBatteryStatus(batteryObject);
  // }
  // function printBatteryStatus(batteryObject) {
  //   setBattery(batteryObject.level)
  // }
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <Icon>
            <Link to="/">
              <ImageLoad className="ourlogo" image={ "./applelogo.png" } />
            </Link>
          </Icon>

        </Column>
        <Column>
          <Row>

            <Clock>{ hours < 10 ? `0${hours}` : hours }:{ minutes < 10 ? `0${minutes}` : minutes }</Clock>
            <Battery battery={ battery } />
          </Row>

        </Column>
      </Wrapper>
    </SHeader>
  );
};