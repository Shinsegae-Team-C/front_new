import "../App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router";
import "../css/App(Payments).css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Table,
  ButtonGroup,
} from "react-bootstrap";

function Payments() {
  let navigate = useNavigate();
  const location = useLocation();
  const userInfo = location.state;
  const [data, setData] = useState([]);
  const [detailData, setDetailData] = useState([]);

  useEffect(() => {
    if (userInfo != null) {
      const userId = userInfo.userId;
      const userName = userInfo.userName;
      const address = userInfo.address;
      const phoneNumber = userInfo.phoneNumber;
    }
  });

  function toOrder() {
    navigate("/order", {
      state: {
        userId: userInfo.userId,
        userName: userInfo.userName,
        address: userInfo.address,
        phoneNumber: userInfo.phoneNumber,
        orderId: userInfo.orderId,
        orderPrice: userInfo.orderPrice,
      },
    });
  }

  // Axios.post("http://localhost:3001/user").then((response) => {
  //   setUserList(response.data);
  // });
  const getOrderListData = async () => {
    try {
      console.log(userInfo.userId);
      console.log(location.state.orderId);
      const result = await axios
        .post("/order/selectOrderList", {
          userId: userInfo.userId,
          orderId: location.state.orderId,
        })
        .then((res) => {
          // console.log("here");
          // console.log(res.data);
          console.log(res);
          console.log(res.data);
          setData(res.data.orderInfo);
          setDetailData(res.data.orderDetail);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOrderListData();
  }, []);

  function ProductDisplay({ itm, i }) {
    console.log(i);

    return (
      <>
        <div className="text-center col-md-4">
          <img
            src={`image/${itm.PRODUCT_ID}.jpg`}
            className="productImage"
          ></img>
          <h5>{itm.PRODUCT_NAME}</h5>
          <p>
            {itm.PRICE}원
            <br />
            수량 {itm.CNT} 개
          </p>
        </div>
      </>
    );
  }
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
              to="/products"
              state={{
                userId: userInfo.userId,
                userName: userInfo.userName,
                address: userInfo.address,
                phoneNumber: userInfo.phoneNumber,
              }}
            >
              <i class="bi bi-shop"></i> 상품목록
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
      <p class="text-center">
        <h1 class="display-2">
          <i class="bi bi-wallet2"></i>
        </h1>
        {/* <h3>결제하기</h3> */}
      </p>
      <p class="text-center">
        <label>이름 : {userInfo.userName} </label>
        <br />
        <label>주소 : {userInfo.address}</label>
        <br />
        <label>번호: {userInfo.phoneNumber}</label>
      </p>
      <br />
      {/* <div class="container-fluid"> */}
      {/* <Table bordered hover size="sm">
          {/* <thead>
            <th>#</th>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th>총 금액</th>
          </thead> 
          <tbody>
            {detailData.map((itm) => (
              <tr key="{data}">
                <td width="200px">
                  <img
                    src={`image/${itm.PRODUCT_ID}.jpg`}
                    className="productImageCart"
                  ></img>
                  {/* <button onKeyDown={(e) => keyPress(e, itm)}>
                    {itm.cart_id}
                  </button> *
                </td>
                <td>{itm.PRODUCT_NAME}</td>
                <td>{itm.PRICE}원</td>
                <td>수량 {itm.CNT} 개</td>
              </tr>
            ))}
          </tbody>
        </Table> */}
      <div className="product-container">
        <h4 className="text-center ">주문 상품 : 총 {detailData.length}개</h4>
        <br />
        <div className="row">
          {detailData &&
            detailData.map((itm, i) => {
              return (
                <ProductDisplay
                  key={i}
                  i={i}
                  itm={detailData[i]}
                ></ProductDisplay>
              );
            })}
        </div>
        {/* {detailData.map((itm) => (
          <div className="text-center">
            <img
              src={`image/${itm.PRODUCT_ID}.jpg`}
              className="productImageCart"
            ></img>
            <h5>{itm.PRODUCT_NAME}</h5>
            <p>
              {itm.PRICE}원
              <br />
              수량 {itm.CNT} 개
            </p>
          </div>
        ))} */}
      </div>
      {/* </div> */}

      {/* <div className="information">
      <label>이름:{name}</label>
      <label>주소:{address}</label>
      <label>번호:{phonenumber}</label>
    </div> */}

      {/* <div className="lableline">
      <th>상품이름{"     "}</th>
      <th>수량{"     "}</th>
      <th>가격</th>
    </div> */}

      {/* <div className='users'>     
      {userList.map((val,key)=>{
        //백앤드 연결후 이름,수량 가격
        return (<div className='user'>
          <h3>{val.userName}</h3>
          <h3>{val.address}</h3>
          <h3>{val.phoneNumber}</h3>
          </div>
        );
      })}
    </div> */}
      {/* <div className='totalpirce'> 
      <t1>총액</t1>
    </div>  */}
      <div className="text-center">
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
        <br />
        <ButtonGroup aria-label="Basic example">
          <Button variant="flat">
            <i class="bi bi-credit-card"></i> 카드
          </Button>
          <Button variant="flat">
            <i class="bi bi-cash-coin"></i> 계좌이체
          </Button>
          <Button variant="flat">SSG PAY</Button>
        </ButtonGroup>
      </div>
      {/* <div className='payment'> 
      <t1>카드</t1>
      <t1>현금</t1>
      <t1>취소</t1>
    </div>     */}
      <div class="text-center">
        <style type="text/css">
          {`
          .btn-flat2 {
            color : black
            border-color:rgb(248, 176, 69);
            --bs-btn-hover-color:#fff;
            --bs-btn-hover-bg: rgb(248, 176, 69);
            --bs-btn-hover-border-color:#0a58ca;
            --bs-btn-active-color:#fff;
            --bs-btn-active-bg:rgb(248, 176, 69);
            --bs-btn-active-border-color:#0a53be;
          }
        `}
        </style>
        <h5>
          결제 예정 금액 : <strong>{location.state.orderPrice}원</strong>
        </h5>
        <Button variant="flat2" onClick={toOrder}>
          결제하기
        </Button>
      </div>
    </div>
  );
}

export default Payments;
