import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components"
import { authService } from "../fbase";

const Main = styled.div`
 width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  padding: 20px;
  background-color: white;

`

const Username = styled.p`
  font-size:20px;
  font-weight: 600;
  color: white;
  margin-top: 40px;
`

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;

color: white;
border-radius: 10px;
box-shadow: 0 6px 25px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 1.0px );
-webkit-backdrop-filter: blur( 1.0px );
h4{
  padding: 5px;
}
`
const Title = styled.p`
font-size: 25px;
  padding: 10px;
`

const CreateAccount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Text = styled.div`
  color: white;
  padding: 60px;
  font-size: 13px;
  font-weight: 400;
`

const Login = styled.div`
display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  span{
    position: absolute;
    bottom: 10px;
    color: white;
    font-weight: 200;
    font-size: 13px;
  }
`

const LoginForm = styled.div`
  display: flex;
  position:relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  input{
    padding: 8px;
    font-size: 12px;
    color: white;
  }
`

const Input = styled.input`
margin: 6px;
width: 100%;
  background: rgba( 29, 31, 33, 0.25 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 5.5px );
-webkit-backdrop-filter: blur( 5.5px );
border-radius:15px;
border: 1px solid rgba( 255, 255, 255, 0.18 );  
padding: 10px;
&::placeholder{
  color: white;
}

`

const SubmitBtn = styled.button`
margin: 4px;
padding: 10px;
border-radius: 50%;
border: none;
background: rgba( 175, 159, 159, 0.25 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 4px );
-webkit-backdrop-filter: blur( 4px );
border: 1px solid rgba( 255, 255, 255, 0.18 );
svg{
  color: white;
}
`


const LoginBtn = styled.button`
position: absolute;
margin: 4px;
bottom:6px;
right: -10px;
padding:4px;
border-radius: 50%;
border: none;
background: rgba( 175, 159, 159, 0.25 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 4px );
-webkit-backdrop-filter: blur( 4px );
border: 1px solid rgba( 255, 255, 255, 0.18 );
svg{
  color: white;
}
`

const SSeparator = styled.div`
    margin: 20px 0 30px 0;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    width: 80%;
    align-items: center;
    div {
        width: 100%;
        height: 1px;
        background-color: white;
    }
    span {
        margin: 0px 10px;
        font-weight: 600;
        font-size: 12px;
        color: white;
    }
`;

const AuthError = styled.span`
  color: #96281b;
  padding: 10px;
`

const Auth = ({ userObj }) => {
  const [mode, setMode] = useState(0)
  const [writing, setWriting] = useState(false)
  const [error, setError] = useState("");
  const history = useHistory()
  const { register, handleSubmit, getValues, setValue } = useForm()
  useEffect(() => {
    console.log(userObj)
    if (userObj !== null) {
      setMode(0)
    } else {
      setMode(1)
    }
    console.log(userObj)


  }, [])

  const onValid = async () => {

    const { password, email } = getValues();

    try {
      let data;
      data = await authService.createUserWithEmailAndPassword(
        email,
        password
      );


      console.log(data);
      setMode(0)
    } catch (error) {
      setError(error.message);
    }

  }
  const onLogin = async () => {
    const { password, email } = getValues();
    try {
      let data;
      data = await authService.signInWithEmailAndPassword(
        email,
        password
      );
      console.log(data);
      history.push("/home")
    } catch (error) {
      setError(error.message);
    }
  }
  return (

    <Main>
      {mode === 0 ? <Login>
        <Avatar />
        <Username>{ "hi" }</Username>
        { writing ? <LoginForm onSubmit={ handleSubmit(onLogin) }>
          <Input
            placeholder="Email"
            name="email"
            ref={ register({ required: true }) }
          />
          <Input
            placeholder="password"
            name="password"
            ref={ register({ required: true }) }
          />
          <LoginBtn onClick={ handleSubmit(onLogin) } >
            <FontAwesomeIcon icon={ faArrowRight } />
          </LoginBtn>
        </LoginForm> : <Text onClick={ () => setWriting(true) }>Touch Id 또는 암호 입력</Text> }
        { error && <AuthError>{ error }</AuthError> }
        <span onClick={ () => {
          setMode(1)
          setWriting(false)
        } }>
          CreateAccount
            </span>
      </Login> :

        <FormBox>
          <Title>TryMac</Title>
          <h4>CreateAccount</h4>
          <CreateAccount onSubmit={ handleSubmit(onValid) }>
            <Input
              placeholder="Email"
              name="email"
              ref={ register({ required: true }) }
            />
            <Input
              placeholder="password"
              name="password"
              ref={ register({ required: true }) }
            />
            <SubmitBtn onClick={ handleSubmit(onValid) }>
              <FontAwesomeIcon icon={ faCheck } />
            </SubmitBtn>
          </CreateAccount>
          { error && <AuthError>{ error }</AuthError> }
          <SSeparator>
            <div></div>
            <span>Or</span>
            <div></div>
          </SSeparator>
          <span onClick={ () => setMode(0) }>
            Login
            </span>
        </FormBox> }


    </Main>
  );
};

export default Auth;