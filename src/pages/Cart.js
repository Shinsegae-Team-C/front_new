import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Navbar,
  Nav,
  Table,
  Button,
  CloseButton,
} from "react-bootstrap";
import axios from "axios";

function Cart() {
  const location = useLocation();

  const userInfo = location.state;

  useEffect(() => {
    if (userInfo != null) {
      const userId = userInfo.userId;
      const userName = userInfo.userName;
      const address = userInfo.address;
      const phoneNumber = userInfo.phoneNumber;
    }
  });
  const getCartListData = async () => {
    try {
      console.log(userInfo.userId);
      const result = await axios
        .post("/cart/selectCartList", {
          userId: userInfo.userId,
        })
        .then((res) => {
          console.log(res);
          setItems(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getCartListData();
  }, []);

  let navigate = useNavigate();
  const [totalPrice, setTotalPrices] = useState(0);
  const [item, setItems] = useState([
    // { cart_id: 1, name: "a", price: 2000, product_cnt: 1, check: "false" },
    // { cart_id: 2, name: "b", price: 3000, product_cnt: 2, check: "false" },
    // { cart_id: 3, name: "c", price: 4000, product_cnt: 3, check: "false" },
  ]);

  function toPayments() {
    navigate("/payments");
  }
  //x버튼 누르면 해당 상품 삭제
  const deleteItem = (id) => {
    const newItems = item.filter((itm) => itm.PRODUCT_ID !== id);
    const delItem = item.filter((itm) => itm.PRODUCT_ID === id)[0];
    console.log(item);
    if (delItem.check === "true") {
      setTotalPrices(totalPrice - delItem.PRICE * delItem.PRODUCT_CNT);
    }
    setItems(newItems);
  };

  //선택한 상품의 가격들만 합치기 -> 총 가격
  const checkHandler = (checked, id) => {
    const product = item.filter((itm) => itm.PRODUCT_ID === id)[0];
    if (checked) {
      setTotalPrices(totalPrice + product.PRICE * product.PRODUCT_CNT);
      const change = item.map((itm) => {
        return {
          ...item,
          PRODUCT_ID: itm.PRODUCT_ID,
          PRODUCT_NAME: itm.PRODUCT_NAME,
          PRICE: itm.PRICE,
          PRODUCT_CNT: itm.PRODUCT_CNT,
          CHK_YN: "true",
        };
      });
      setItems(change);
    } else {
      setTotalPrices(totalPrice - product.PRICE * product.PRODUCT_CNT);
      const change = item.map((itm) => {
        return {
          ...item,
          PRODUCT_ID: itm.PRODUCT_ID,
          PRODUCT_NAME: itm.PRODUCT_NAME,
          PRICE: itm.PRICE,
          PRODUCT_CNT: itm.PRODUCT_CNT,
          CHK_YN: "false",
        };
      });
      setItems(change);
      console.log(change);
    }
  };

  //수량 방향키로 조절하는 거  37:왼쪽, 39:오른쪽 방향키
  const keyPress = (event, target) => {
    const subtractQty = item.map((itm) => {
      if (itm.PRODUCT_ID === target.PRODUCT_ID) {
        if (event.keyCode === 37 && itm.PRODUCT_CNT >= 1) {
          if (itm.CHK_YN === "true") {
            setTotalPrices(totalPrice - itm.PRICE);
          }
          return {
            ...item,
            PRODUCT_ID: itm.PRODUCT_ID,
            PRODUCT_NAME: itm.PRODUCT_NAME,
            PRICE: itm.PRICE,
            PRODUCT_CNT: itm.PRODUCT_CNT - 1,
            CHK_YN: itm.CHK_YN,
          };
        }
        if (event.keyCode === 39) {
          if (itm.CHK_YN === "true") {
            setTotalPrices(totalPrice + itm.PRICE);
          }
          return {
            ...item,
            PRODUCT_ID: itm.PRODUCT_ID,
            PRODUCT_NAME: itm.PRODUCT_NAME,
            PRICE: itm.PRICE,
            PRODUCT_CNT: itm.PRODUCT_CNT + 1,
            CHK_YN: itm.CHK_YN,
          };
        }
      } else return itm;
    });
    setItems(subtractQty);
  };
  //화면 단
  return (
    <div>
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
          <Nav>
            <Nav.Link>
              <i class="bi bi-volume-up"></i> 음성듣기
            </Nav.Link>
            <Nav.Link href="/">
              <i class="bi bi-house"></i> 홈으로
            </Nav.Link>
            <Nav.Link href="/search">
              <i class="bi bi-search"></i> 상품검색
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <p class="text-center">
        <h1 class="display-2">
          <i class="bi bi-cart2"></i>
        </h1>
        <h3>장바구니</h3>
      </p>
      <div class="container-fluid">
        <Table bordered hover size="sm">
          <thead>
            <th>#</th>
            <th>선택</th>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th></th>
          </thead>
          <tbody>
            {item.map((itm) => (
              <tr key="{itm}">
                <td width="120px">
                  <style type="text/css">
                    {`
          .btn-flat {
            --bs-btn-color:#212529;
            --bs-btn-border-color:#fff;
            --bs-btn-hover-color:#fff;
            --bs-btn-hover-bg:rgb(248, 176, 69);;
            --bs-btn-hover-border-color:#fff;
            --bs-btn-focus-shadow-rgb:33,37,41;
            --bs-btn-active-color:#fff;
            --bs-btn-active-bg:#212529;
            --bs-btn-active-border-color:#212529;
            --bs-btn-active-shadow:inset 0 3px 5px rgba(0, 0, 0, 0.125);
            --bs-btn-disabled-color:#212529;
            --bs-btn-disabled-bg:transparent;
            --bs-btn-disabled-border-color:#212529;
            -bs-gradient:none}
            .btn-flat2 {
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
                  <Button variant="flat" onKeyDown={(e) => keyPress(e, itm)}>
                    {itm.PRODUCT_ID}
                  </Button>
                  {/* <button onKeyDown={(e) => keyPress(e, itm)}>
                    {itm.cart_id}
                  </button> */}
                </td>
                <td>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    onChange={(e) => {
                      checkHandler(e.currentTarget.checked, itm.PRODUCT_ID);
                    }}
                  ></input>
                </td>
                <td>{itm.PRODUCT_NAME}</td>
                <td>{itm.PRICE}원</td>
                <td>{itm.PRODUCT_CNT}</td>
                <td>
                  <CloseButton
                    onClick={() => deleteItem(itm.PRODUCT_ID)}
                  ></CloseButton>
                  {/* <button onClick={() => deleteItem(itm.cart_id)}>X</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h6 class="text-muted">
          <i class="bi bi-info-circle"></i> 수량조절은 원하는 번호를 누르고
          감소시키고 싶으면 왼쪽 방향키를, 증가시키고 싶으면 오른쪽 방향키를
          눌러주세요.
        </h6>
      </div>
      {/* <table class="table">
        <thead>
          <th>#</th>
          <th>선택</th>
          <th>상품명</th>
          <th>가격</th>
          <th>수량</th>
          <th></th>
        </thead>
        <tbody>
          {item.map((itm) => (
            <tr>
              <td>
                <button onKeyDown={(e) => keyPress(e, itm)}>
                  {itm.cart_id}
                </button>
              </td>
              <td>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    checkHandler(e.currentTarget.checked, itm.cart_id);
                  }}
                ></input>
              </td>
              <td>{itm.name}</td>
              <td>{itm.price}원</td>
              <td>{itm.product_cnt}</td>
              <td>
                <button onClick={() => deleteItem(itm.cart_id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <div class="text-center">
        {/* <i class="bi bi-cash"></i>  */}
        {totalPrice}원
      </div>
      <div class="text-center">
        <Button variant="flat2" onClick={toPayments}>
          <i class="bi bi-truck"></i> 주문하기
        </Button>
        {/* <button>주문하기</button> */}
      </div>
    </div>
  );
}
export default Cart;
