import "../App.css";
import { useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [userId, setId] = useState("");
  const [userPw, setPw] = useState("");
  const [userName, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // const [userList, setUserList] = useState([]);

  let navigate = useNavigate();

  const addUser = () => {
    Axios.post("/user/signUp", {
      userId: userId,
      userPw: userPw,
      userName: userName,
      address: address,
      phoneNumber: phoneNumber,
    }).then((res) => {
      console.log("success");
      console.log(res);
      var status = res.data;
      if (status === "001") {
        window.alert("회원가입에 성공했습니다.");
      } else if (status === "002") {
        window.alert("이미 존재하는 아이디입니다.");
      } else if (status === "009") {
        window.alert("올바르지 않은 전화번호 형식입니다.");
      } else if (status === "010") {
        window.alert("전화번호는 숫자만 입력가능합니다.");
      } else if (status === "011") {
        window.alert("중복된 전화번호입니다.");
      }
    });
  };

  const movePg = (e) => {
    if (e.keyCode === 13) {
      setTimeout(function () {
        navigate("/login");
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
    addUser();
    // else if (e.keyCode == 13) {

    // }
  };
  function toLogin() {
    navigate("/login");
  }

  // const getUser = () => {
  //   Axios.post("/user").then((response) => {
  //     setUserList(response.data);
  //   });
  // };

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
            <Nav.Link href="/login">로그인</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
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
          회원가입
          <br />
        </h1>
        <Row>
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
            <br />
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            {" "}
            <label>이름</label>
            <input
              type="text"
              className="form-control mt-1"
              onChange={(event) => {
                setName(event.target.value);
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
            <label>주소</label>
            <input
              type="text"
              className="form-control mt-1"
              onChange={(event) => {
                setAddress(event.target.value);
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
            <label>전화번호</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="010-xxxx-xxxx 형식으로 입력해주세요."
              onChange={(event) => {
                setPhoneNumber(event.target.value);
              }}
            />
            <br />
          </Col>
          <Col></Col>
        </Row>
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
            <Button
              variant="flat"
              onClick={() => {
                addUser();
                toLogin();
              }}
            >
              <i className="bi bi-person-plus-fill"></i> 회원가입하기
            </Button>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      {/* <div className="signup">
        <label>회원가입</label>
        <label>{"\n"}</label>
      </div> */}
      {/* <div className="information"> */}
      {/* <label>ID:</label>
        <input
          type="text"
          onChange={(event) => {
            setId(event.target.value);
          }}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(event) => {
            setPw(event.target.value);
          }}
        /> */}
      {/* <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Address:</label>
        <input 
        type="text" 
        onChange={(event) => {
          setAddress(event.target.value);
        }}
        />
        <label>phonenumber:</label>
        <input
          type="text"
          onChange={(event) => {
            setPhoneNumber(event.target.value);
          }}
        />       */}
      {/* <button onClick={addUser}>회원 가입</button> */}
      {/* </div> */}
      {/* <div className='users'>
        <button onClick={getUser}>Show User</button>

        {userList.map((val,key)=>{
          return (<div className='user'>
            <h3>ID: {val.userId}</h3>
            <h3>Password: {val.userPw}</h3>
            <h3>Name: {val.userName}</h3>
            <h3>address: {val.address}</h3>
            <h3>phonenumber: {val.phoneNumber}</h3>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}

export default Signup;
