import { useNavigate } from "react-router-dom";
import * as React from "react";
import { useState } from 'react';
import Axios from "axios";

function Login() {
  const [userId, setId] = useState("");
  const [userPw, setPw] = useState("");
  let navigate = useNavigate();
  function toJoin() {
    navigate("/signup");
  }
  const login = () => {
    Axios.post('/user/login',{
      userId: userId,
      userPw: userPw, 
    }).then((res)=>{
      console.log(res);
    });
  };
  return (
    <div>
      <h1>Login</h1>
      <form>
        ID :<input type="text" onChange={(event) => {
          setId(event.target.value);
        }}></input>
        <br />
        PWD : <input type="password" onChange={(event) => {
          setPw(event.target.value);
        }}></input>
        <br />
        <button onClick={login}>로그인</button>
      </form>
      <button onClick={toJoin}>회원가입하기</button>
    </div>
  );
}

export default Login;
