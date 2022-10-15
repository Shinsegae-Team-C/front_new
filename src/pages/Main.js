import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router";
import { Container, Navbar, Nav } from "react-bootstrap";
import "../App.css";
import { useState, useEffect } from "react";
// import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Main = (props) => {
  // const [isAuth, setIsAuth] = useState(false);
  // console.log(isAuth);
  const location = useLocation();
  let navigate = useNavigate();

  const userInfo = location.state;

  const [is_login, setLogin] = useState(false);
  // const [User, setUser] = useState(Object);

  useEffect(() => {
    //
    if (sessionStorage.info === undefined) {
      //sessionStorage에 "info" object 없을때
      sessionStorage.setItem(
        "info",
        JSON.stringify({
          login: false,
        })
      );
    }
    const obj = JSON.parse(sessionStorage.getItem("info"));
    setLogin(obj.login); //is_login update. true경우 로그인상태
  }, []);

  useEffect(() => {
    if (userInfo != null) {
      const userId = userInfo.userId;
      // const userName = userInfo.userName;
      // const address = userInfo.address;
      // const phoneNumber = userInfo.phoneNumber;
      // setIsAuth(userId);
    }
  });

  const onClickHandler = () => {
    //
    sessionStorage.setItem(
      "info",
      JSON.stringify({
        login: false, // 로그아웃 눌렀을때 info.login 초기화
      })
    );
    window.alert("로그아웃 되었습니다.");
    window.location.reload(); //새로고침
  }; //

  const movePg = (e) => {
    if (!is_login) {
      if (e.keyCode === 81) {
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
      } else if (e.keyCode === 87) {
        setTimeout(function () {
          navigate("/signup");
        }, 1000);
      }
    } else {
      // console.log("NAME: " + JSON.parse(sessionStorage.getItem("info")).userName);
      if (e.keyCode === 81) {
        setTimeout(function () {
          navigate("/search", {
            // state: {
            //   userId: userInfo.userId,
            //   userName: userInfo.userName,
            //   address: userInfo.address,
            //   phoneNumber: userInfo.phoneNumber,
            // },
          });
        }, 1000);
      } else if (e.keyCode === 87) {
        setTimeout(function () {
          navigate("/cart", {
            // state: {
            //   userId: userInfo.userId,
            //   userName: userInfo.userName,
            //   address: userInfo.address,
            //   phoneNumber: userInfo.phoneNumber,
            // },
          });
        }, 1000);
      } else if (e.keyCode === 69) {
        setTimeout(function () {
          onClickHandler();
        }, 1000);
      }
    }
  };

  // setUserInfo(sessionStorage.info);
  // setUser(JSON.parse(sessionStorage.getItem('info')));
  // console.log(JSON.parse(sessionStorage.getItem("info")).userId);
  // console.log("isAuth : " + Boolean(isAuth));
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
      ></link>
      <Navbar className="soso-navbar" variant="light">
        <Container>
          <Navbar.Brand href="/" className="soso-black">
            <img
              src="image/puu.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            소소배송
          </Navbar.Brand>
          {
            // isAuth
            is_login && (
              <Nav>
                <Navbar.Collapse>
                  <Navbar.Text>
                    <a href="#login">
                      {JSON.parse(sessionStorage.getItem("info")).userName}님
                    </a>
                  </Navbar.Text>
                </Navbar.Collapse>
                {/* <Nav.Link>
                <i class="bi bi-volume-up"></i> 음성듣기
              </Nav.Link> */}
                <Nav.Link
                  as={Link}
                  to="/search"
                  // state={{
                  //   userId: userInfo.userId,
                  //   userName: userInfo.userName,
                  //   address: userInfo.address,
                  //   phoneNumber: userInfo.phoneNumber,
                  // }}
                >
                  <i className="bi bi-search"></i> 상품검색
                </Nav.Link>
                {/* <Nav.Link
                as={Link}
                to="/products"
                state={{
                  userId: userInfo.userId,
                  userName: userInfo.userName,
                  address: userInfo.address,
                  phoneNumber: userInfo.phoneNumber,
                }}
              >
                <i class="bi bi-shop"></i> 상품목록
              </Nav.Link> */}
                <Nav.Link
                  as={Link}
                  to="/cart"
                  // state={{
                  //   userId: userInfo.userId,
                  //   userName: userInfo.userName,
                  //   address: userInfo.address,
                  //   phoneNumber: userInfo.phoneNumber,
                  // }}
                >
                  <i className="bi bi-cart2"></i> 장바구니
                </Nav.Link>
                <Nav.Link onClick={onClickHandler}>로그아웃하기</Nav.Link>
              </Nav>

              // <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              // <ul>
              //   <Link
              // to="/cart"
              // state={{
              //   userId: userInfo.userId,
              //   userName: userInfo.userName,
              //   address: userInfo.address,
              //   phoneNumber: userInfo.phoneNumber,
              // }}
              //   >
              //     {" "}
              //     <li>장바구니</li>
              //   </Link>
              //   <NavLink
              //     to="/search"
              // state={{
              //   userId: userInfo.userId,
              //   userName: userInfo.userName,
              //   address: userInfo.address,
              //   phoneNumber: userInfo.phoneNumber,
              // }}
              //   >
              //     {" "}
              //     <li>검색창</li>
              //   </NavLink>
              //   <Link
              // to="/products"
              // state={{
              //   userId: userInfo.userId,
              //   userName: userInfo.userName,
              //   address: userInfo.address,
              //   phoneNumber: userInfo.phoneNumber,
              // }}
              //   >
              //     {" "}
              //     <li>상품리스트</li>
              //   </Link>
              // </ul>
            )
          }
          {
            // !isAuth
            !is_login && (
              <Nav>
                {/* <Nav.Link>
                <i class="bi bi-volume-up"></i> 음성듣기
              </Nav.Link> */}
                <Nav.Link href="/login">로그인</Nav.Link>
                <Nav.Link href="/signup">회원가입</Nav.Link>
              </Nav>
            )
          }
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
      <div className="MainImgContainer">
        <img
          src="image/Main.png"
          className="d-inline-block"
          alt="React Bootstrap logo"
        ></img>
      </div>
      {/* <p className="MainFont">
        <h1>
          <br />
          안녕하세요. <br />
          소소배송(소리나는 소규모 배송) 입니다.
          <br />
        </h1> 
        <br />
        <br />
      </p> */}
      <div className="MainImgContainer2">
        <img
          src="image/puu.png"
          className="d-inline-block align-top MainImage"
          alt="React Bootstrap logo"
        />
      </div>

      {/* <h1 class="display-1">
          <i class="bi-mic-fill"></i>
        </h1> */}
      {/* <ul>
        <Link to="/cart">
          <li>장바구니</li>
        </Link>
        <Link to="/login">
          <li>로그인</li>
        </Link>
        <Link to="/join">
          <li>회원가입</li>
        </Link>
        <Link to="/search">
          <li>검색창</li>
        </Link>
        <Link to="/products">
          <li>상품리스트</li>
        </Link>
      </ul> */}
    </>
  );
};

export default Main;
