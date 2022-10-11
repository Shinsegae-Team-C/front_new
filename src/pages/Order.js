import "../App.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Navbar,
  Nav,
  Row,
  Col,
  Button,
  Table,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

function Order() {
  let navigate = useNavigate();
  const location = useLocation();
  const userInfo = location.state;
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhonenumber] = useState("");

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (userInfo != null) {
      const userId = userInfo.userId;
      const userName = userInfo.userName;
      const address = userInfo.address;
      const phoneNumber = userInfo.phoneNumber;
    }
  });

  function toHome() {
    navigate("/", {
      state: {
        userId: userInfo.userId,
        userName: userInfo.userName,
        address: userInfo.address,
        phoneNumber: userInfo.phoneNumber,
      },
    });
  }

  // Axios.post("/user").then((response) => {
  //   setUserList(response.data);
  // });

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
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/search"
              state={{
                userId: userInfo.userId,
                userName: userInfo.userName,
                address: userInfo.address,
                phoneNumber: userInfo.phoneNumber,
              }}
            >
              <i class="bi bi-search"></i> 상품검색
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/cart"
              state={{
                userId: userInfo.userId,
                userName: userInfo.userName,
                address: userInfo.address,
                phoneNumber: userInfo.phoneNumber,
              }}
            >
              <i class="bi bi-cart2"></i> 장바구니
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link>
              <i class="bi bi-volume-up"></i> 음성듣기
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/"
              state={{
                userId: userInfo.userId,
                userName: userInfo.userName,
                address: userInfo.address,
                phoneNumber: userInfo.phoneNumber,
              }}
            >
              <i class="bi bi-house"></i> 홈으로
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <br />
      <br />
      <p class="text-center">
        <h1 class="display-2">
          <i class="bi bi-cart-check"></i>
        </h1>
        <br />
        <h3>주문이 정상적으로 완료되었습니다.</h3>
      </p>
      <br />
      <div class="container-fluid">
        <h5 class="text-center">주문번호 : {userInfo.orderId}</h5>
        <br />
        <p class="text-center">
          <h5>배송지 정보</h5>
          <label>
            <i class="bi bi-person-fill"></i> {userInfo.userName}
          </label>
          <br />
          <label>
            <i class="bi bi-telephone"></i> {userInfo.phoneNumber}
          </label>
          <br />
          <label>
            <i class="bi bi-truck"></i> {userInfo.address}
          </label>
          <br />
        </p>
      </div>
      <div class="text-center">주문 금액 : {userInfo.orderPrice}원</div>

      {/* <div className="information">
        <label>주문완료</label>
      </div> */}

      {/* <div className="lableline">
        <th>상품이름{"     "}</th>
        <th>수량{"     "}</th>
        <th>가격</th>
      </div> */}

      <div className="users">
        {userList.map((val, key) => {
          //백앤드 연결후 이름,수량 가격
          return (
            <div className="user">
              <h3>{val.userName}</h3>
              <h3>{val.address}</h3>
              <h3>{val.phoneNumber}</h3>
            </div>
          );
        })}
      </div>
      {/* <div className='totalpirce'> 
        <t1>총액</t1>
      </div>  */}
      <div class="text-center">
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
        <Button variant="flat" onClick={toHome}>
          <i class="bi bi-house"></i> 홈으로
        </Button>
        {/* <button>주문하기</button> */}
      </div>
    </div>
  );
}

export default Order;
