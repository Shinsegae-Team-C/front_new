import { useNavigate } from "react-router-dom";
import * as React from "react";

function Join() {
  let navigate = useNavigate();
  function toHome() {
    navigate("/");
  }
  return (
    <div>
      <h1>Join</h1>
      <form>
        ID :<input type="text"></input>
        <br />
        PWD : <input type="password"></input>
        <br />
        주소 : <input type="text"></input>
        <br />
        이름 : <input type="text"></input>
        <br />
        전화번호 : <input type="text"></input>
        <br />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default Join;
