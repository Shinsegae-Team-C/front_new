import { useNavigate } from "react-router-dom";
import * as React from "react";
import { useState } from "react";
import Axios from "axios";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, Row, Col, Form } from "react-bootstrap";

function Login() {
  const [userId, setId] = useState("");
  const [userPw, setPw] = useState("");
  let navigate = useNavigate();
  function toJoin() {
    navigate("/signup");
  }

  const movePg = (e) => {
    if (e.keyCode === 81) {
      setTimeout(function () {
        navigate("/signup");
      }, 1000);
      // navigate("/", {
      //   state: {
      //     userId: userData.userId,
      //     userName: userData.userName,
      //     address: userData.address,
      //     phoneNumber: userData.phoneNumber,
      //   },
      // });
    }
    // else if (e.keyCode == 13) {

    // }
  };
  // function LoginSubmit() {
  //   return (
  //     <>
  //       <input type="submit" value="로그인하기" class="form-control"></input>
  //     </>
  //   );
  // }
  const login = (e) => {
    e.preventDefault();
    Axios.post("/user/login", {
      userId: userId,
      userPw: userPw,
    })
      .then((res) => {
        var userData = res.data.info;
        var status = res.data.code;
        if (status === "000") {
          sessionStorage.setItem(
            "info",
            JSON.stringify({
              userId: userData.userId,
              userName: userData.userName,
              address: userData.address,
              phoneNumber: userData.phoneNumber,
              login: true,
            })
          );
          window.alert("로그인에 성공했습니다.");
        } else if (status === "012") {
          window.alert(
            "아이디 또는 비밀번호가 일치하지 않습니다. 다시 확인하신 후 입력해주세요."
          );
        }
        navigate("/", {
          // state: {
          //   userId: userData.userId,
          //   userName: userData.userName,
          //   address: userData.address,
          //   phoneNumber: userData.phoneNumber,
          // },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
      ></link>
      <Navbar className="soso-navbar" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="image/puu.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            소소배송
          </Navbar.Brand>
          <Nav>
            {/* <Nav.Link>
              <i class="bi bi-volume-up"></i> 음성듣기
            </Nav.Link> */}
            <Nav.Link href="/">
              <i className="bi bi-house"></i> 홈으로
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* <form class="text-center" >
        <label>ID :</label>
        <input type="text" onChange={(event) => {
          setId(event.target.value);
        }}></input>
        <br />
        PWD : <input type="password" onChange={(event) => {
          setPw(event.target.value);
        }}></input>
        <br />
        <button onClick={login}>로그인</button>
      </form>
      <div class="text-center">
      <button onClick={toJoin}>회원가입하기</button>
      </div> */}
      <div>
        <input
          type="text"
          className="form-control mt-1"
          onKeyDown={(e) => movePg(e)}
          autoFocus
        ></input>
      </div>
      <Container>
        <h1 className="Auth-form-title text-center">
          <br />
          로그인
          <br />
          <br />
        </h1>
        {/* <Row>
          <Col></Col>
          <Col>
            {" "}
            <label>아이디</label>
            <input
              type="text"
              className="form-control mt-1"
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
            <br />
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            {" "}
            <label>비밀번호</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="비밀번호를 입력해주세요."
              onChange={(event) => {
                setPw(event.target.value);
              }}
            />
          </Col>
          <Col></Col>
        </Row> */}
        <Row>
          <Col></Col>
          <Col xs={3}>
            <style type="text/css">
              {`
          .btn-flat {
            background-color: rgb(248, 176, 69);
            color : black
            --bs-btn-hover-color:#fff;
            --bs-btn-hover-bg: rgb(248, 176, 69);
            --bs-btn-hover-border-color:#0a58ca;
            --bs-btn-active-color:#fff;
            --bs-btn-active-bg:rgb(248, 176, 69);
            --bs-btn-active-border-color:#0a53be;
          }
        `}
            </style>
            {/* <form onSubmit={login}>
              <input type="submit" value="로그인">
                {" "}
              </input>
            </form>{" "} */}
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <Form onSubmit={login}>
        <Row>
          <Col></Col>
          <Col>
            <label>아이디</label>
            <input
              type="text"
              className="form-control mt-1"
              onChange={(event) => {
                setId(event.target.value);
              }}
            ></input>
            <br />
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <label>비밀번호</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="비밀번호를 입력해주세요."
              onChange={(event) => {
                setPw(event.target.value);
              }}
            ></input>
            <br />
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <div className="text-center">
              처음 방문이신가요?
              <span className="soso-button" onClick={toJoin}>
                회원가입하기
              </span>
            </div>
            <br />
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <input
              type="submit"
              value="로그인하기"
              className="form-control"
            ></input>
          </Col>
          <Col></Col>
        </Row>
        {/* ID :
        <input
          type="text"
          className="form-control mt-1"
          onChange={(event) => {
            setId(event.target.value);
          }}
        ></input> */}
        {/* <br />
        PWD :{" "}
        <input
          type="password"
          onChange={(event) => {
            setPw(event.target.value);
          }}
        ></input> */}
        <br />
      </Form>
      {/* <h1>Login</h1>
      <form onSubmit={login}>
        ID :
        <input
          type="text"
          onChange={(event) => {
            setId(event.target.value);
          }}
        ></input>
        <br />
        PWD :{" "}
        <input
          type="password"
          onChange={(event) => {
            setPw(event.target.value);
          }}
        ></input>
        <br />
        <input type="submit" value="로그인"></input>
      </form> */}
      {/* <button onClick={toJoin}>회원가입하기</button> */}
    </div>
  );
}

export default Login;
