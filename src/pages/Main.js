import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router";
import { Container, Navbar, Nav } from "react-bootstrap";
import "../App.css";
import { useState, useEffect } from "react";

const Main = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  console.log(isAuth);
  const location = useLocation();

  const userInfo = location.state;

  useEffect(() => {
    if (userInfo != null) {
      const userId = userInfo.userId;
      const userName = userInfo.userName;
      const address = userInfo.address;
      const phoneNumber = userInfo.phoneNumber;

      setIsAuth(userId);
    }
  });

  console.log("isAuth : " + Boolean(isAuth));
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
          {isAuth && (
            // <Nav className="me-auto">
            //   <Nav.Link href="/search">
            //     <i class="bi bi-search"></i> 상품검색
            //   </Nav.Link>
            //   <Nav.Link href="/products">
            //     <i class="bi bi-shop"></i> 상품목록
            //   </Nav.Link>
            //   <Nav.Link href="/cart">
            //     <i class="bi bi-cart2"></i> 장바구니
            //   </Nav.Link>
            // </Nav>
            // <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            // <Nav className="me-auto">
            //   <Nav.Link
            //     href="/search"
            //     state={{
            //       userId: userInfo.userId,
            //       userName: userInfo.userName,
            //       address: userInfo.address,
            //       phoneNumber: userInfo.phoneNumber,
            //     }}
            //   >
            //     <i class="bi bi-search"></i> 상품검색
            //   </Nav.Link>
            //   <Nav.Link
            //     href="/products"
            //     state={{
            //       userId: userInfo.userId,
            //       userName: userInfo.userName,
            //       address: userInfo.address,
            //       phoneNumber: userInfo.phoneNumber,
            //     }}
            //   >
            //     <i class="bi bi-shop"></i> 상품목록
            //   </Nav.Link>
            //   <Nav.Link
            //     href="/cart"
            //     state={{
            //       userId: userInfo.userId,
            //       userName: userInfo.userName,
            //       address: userInfo.address,
            //       phoneNumber: userInfo.phoneNumber,
            //     }}
            //   >
            //     <i class="bi bi-cart2"></i> 장바구니
            //   </Nav.Link>
            // </Nav>
            <ul>
              <Link
                to="/cart"
                state={{
                  userId: userInfo.userId,
                  userName: userInfo.userName,
                  address: userInfo.address,
                  phoneNumber: userInfo.phoneNumber,
                }}
              >
                {" "}
                <li>장바구니</li>
              </Link>
              <Link
                to="/search"
                state={{
                  userId: userInfo.userId,
                  userName: userInfo.userName,
                  address: userInfo.address,
                  phoneNumber: userInfo.phoneNumber,
                }}
              >
                {" "}
                <li>검색창</li>
              </Link>
              <Link
                to="/products"
                state={{
                  userId: userInfo.userId,
                  userName: userInfo.userName,
                  address: userInfo.address,
                  phoneNumber: userInfo.phoneNumber,
                }}
              >
                {" "}
                <li>상품리스트</li>
              </Link>
            </ul>
          )}
          {!isAuth && (
            <Nav>
              <Nav.Link>
                <i class="bi bi-volume-up"></i> 음성듣기
              </Nav.Link>
              <Nav.Link href="/login">로그인</Nav.Link>
              <Nav.Link href="/signup">회원가입</Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
      <p class="text-center">
        <h1>
          <br />
          안녕하세요. <br />
          소소배송(소리나는 소규모 배송) 입니다.
          <br />
        </h1>
        <br />
        <h4 class="text-muted">아래의 마이크를 누르고 말씀해주세요 :)</h4>
        <br />
      </p>
      <div class="text-center">
        <img
          src="image/voice-search.png"
          width="300"
          height="300"
          className="d-inline-block align-top"
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
