import { useNavigate } from "react-router-dom";
import * as React from "react";
import axios from "axios";
import { useState } from 'react';


function Login() {
  let navigate = useNavigate();
  function toJoin() {
    navigate("/join");
  }
  const [data, setData] = useState();
  const logindata = async () => {
    const URL = "/user/login"; 
    try {
      const res = await axios
        .post(URL, {
          userId: "test123",
          userPw: "test123"
        },
          { withCredentials: true },
        )
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div>
      <h1>Login</h1>
      <form>
        ID :<input type="text"></input>
        <br />
        PWD : <input type="password"></input>
        <br />
        <button type="submit" onClick={logindata}>로그인</button>
      </form>
      <button onClick={toJoin}>회원가입하기</button>
      {data && <div>{data}</div>}
    </div>
  );
}

export default Login;
