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
  const date = new Date();
  const year = date.getFullYear().toString();
  const months = date.getMonth() + 1;
  const month = months.toString();
  const day = date.getDate().toString();
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  const seconds = date.getSeconds().toString();
  const milliseconds = date.getMilliseconds().toString();

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

  //x버튼 누르면 해당 상품 삭제
  const deleteItem = (id) => {
    const newItems = item.filter((itm) => itm.PRODUCT_ID !== id);
    const delItem = item.filter((itm) => itm.PRODUCT_ID === id)[0];
    console.log(item);
    if (delItem.check === "true") {
      setTotalPrices(totalPrice - delItem.PRICE * delItem.PRODUCT_CNT);
    }
    setItems(newItems);
    deleteFromCart(id);
  };

  function deleteFromCart(productid) {
    console.log(productid);
    axios
      .post("/cart/deleteCartInfo", {
        userId: userInfo.userId,
        productId: productid,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //선택한 상품의 가격들만 합치기 -> 총 가격
  const checkHandler = (checked, id) => {
    const product = item.filter((itm) => itm.PRODUCT_ID === id)[0];
    if (checked) {
      setTotalPrices(totalPrice + product.PRICE * product.PRODUCT_CNT);
      const change = item.map((itm) => {
        return {
          ...item,
          PRODUCT_ID: itm.PRODUCT_ID,
          productId: itm.PRODUCT_ID,
          PRODUCT_NAME: itm.PRODUCT_NAME,
          PRICE: String(itm.PRICE),
          PRODUCT_CNT: String(itm.PRODUCT_CNT),
          CHK_YN: "true",
          orderId: newOrderId,
          totalPrice: String(itm.PRICE * itm.PRODUCT_CNT),
          addr: userInfo.address,
          cnt: String(itm.PRODUCT_CNT),
          userId: userInfo.userId,
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
  var newOrderId =
    year + month + day + hours + minutes + seconds + milliseconds;

  function toPayments() {
    navigate("/payments", {
      state: {
        userId: userInfo.userId,
        userName: userInfo.userNamer,
        address: userInfo.address,
        phoneNumber: userInfo.phoneNumber,
        orderId: newOrderId,
        orderPrice: totalPrice,
      },
    });
  }
  // const btnStyle = {
  //   color: "white",
  //   background: "rgb(248, 176, 69)",
  //   // padding: ".300rem .75rem",
  //   border: "1px solid ",
  //   borderRadius: ".25rem",
  //   fontSize: "0.75rem",
  //   lineHeight: 1.5,
  //   height: "auto",
  //   width: "75px",
  // };

  function insertIntoOrder(e, productid) {
    console.log(e);
    console.log(item);
    axios
      .post("/cart/saveOrder", item, { withCredentials: true })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.res);
      });
    // axios
    //   .post("/cart/saveOrder", {
    //     orderId: "20220925000511test",
    //     userId: "test",
    //     totalPrice: "12500",
    //     addr: "test",
    //     // productId: "00001",
    //     // cnt: "3",
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    toPayments();
  }
  //주문하기 버튼 클릭시 실행

  //console.log(newOrderId);
  //newOrderId +

  // {
  // "orderId":"20220925000511test",
  // "userId":"test",
  // "totalPrice" : "12500",
  // "addr": "test",
  // "productId":"00001",
  // "cnt": "3"
  //   },

  var data = item;

  //axios 주문 연동
  // axios
  //   .post("/cart/saveOrder", {
  //     userId: userId,
  //     userPw: userPw,
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // function CartDisplay({ item, i }) {
  //   console.log(i);
  //   return (
  //     <>
  //       <div className="col-md-4 text-center">
  //         <img
  //           src={`image/${item.PRODUCT_ID}.png`}
  //           className="productImage"
  //         ></img>
  //         {/* <Button variant="flat" onKeyDown={(e) => keyPress(e, item)}>
  //           {item.PRODUCT_ID}
  //         </Button> */}
  //         <br />
  //         <button style={btnStyle} onKeyDown={(e) => keyPress(e, item)}>
  //           {item.PRODUCT_ID}
  //         </button>
  //         <p>
  //           {item.PRODUCT_NAME}
  //           <br />
  //           {item.PRICE}원
  //           <br />
  //           수량 : {item.PRODUCT_CNT}
  //           <br />
  //           <CloseButton
  //             onClick={() => deleteItem(item.PRODUCT_ID)}
  //           ></CloseButton>
  //         </p>
  //       </div>
  //     </>
  //   );
  // }
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
      {/* <div className="product-container">
        <div className="row">
          {item.map((itm, i) => {
            return <CartDisplay key={i} i={i} item={item[i]}></CartDisplay>;
          })}
        </div>
      </div> */}

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
              // <tr key="{itm}">
              //   <td width="120px">
              <tr key="{itm}">
                <td width="120px">
                  <style type="text/css">
                    {`

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
                <td>총 주문 금액 : {itm.PRICE}원</td>
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
        <Button variant="flat2" onClick={insertIntoOrder}>
          <i class="bi bi-truck"></i> 주문하기
        </Button>
        {/* <button>주문하기</button> */}
      </div>
    </div>
  );
}
export default Cart;
