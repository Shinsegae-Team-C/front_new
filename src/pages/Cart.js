import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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

  const [User, setUser] = useState(Object);

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("info")));
  }, []);

  useEffect(() => {
    if (userInfo != null) {
      // const userId = userInfo.userId;
      // const userName = userInfo.userName;
      // const address = userInfo.address;
      // const phoneNumber = userInfo.phoneNumber;
    }
  });
  const getCartListData = async () => {
    try {
      // console.log(userInfo.userId);
      // console.log("NAME: " + userInfo.userName);
      // const result = await axios
      //   .post("/cart/selectCartList", {
      //     userId: userInfo.userId,
      //   })
      //   .then((res) => {
      //     // console.log(res);
      //     setItems(res.data);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      // console.log(User.userId);
      // console.log(User);
      await axios
        .post("/cart/selectCartList", {
          userId: JSON.parse(sessionStorage.getItem("info")).userId,
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
    // console.log(productid);
    axios
      .post("/cart/deleteCartInfo", {
        userId: User.userId,
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
    var findIndex = item.findIndex((itm) => itm.PRODUCT_ID === id);
    // console.log(checked);
    const change = [...item];
    if (checked) {
      // console.log(checked);
      setTotalPrices(
        totalPrice + change[findIndex].PRICE * change[findIndex].PRODUCT_CNT
      );
      change[findIndex].CHK_YN = "true";
      // console.log(change[findIndex]);
      setItems(change);
      // temp[id].CHK_YN = "true";
      // const change = item.map((itm) => {
      //   // console.log(itm);
      //   return {
      //     PRODUCT_ID: itm.PRODUCT_ID,
      //     productId: itm.PRODUCT_ID,
      //     PRODUCT_NAME: itm.PRODUCT_NAME,
      //     PRICE: String(itm.PRICE),
      //     PRODUCT_CNT: String(itm.PRODUCT_CNT),
      //     CHK_YN: "true",
      //     orderId: newOrderId,
      //     totalPrice: totalPrice,
      //     addr: userInfo.address,
      //     cnt: String(itm.PRODUCT_CNT),
      //     userId: userInfo.userId,
      //   };
      // });
      // console.log(temp);
    } else {
      setTotalPrices(
        totalPrice - change[findIndex].PRICE * change[findIndex].PRODUCT_CNT
      );
      // console.log(item);
      change[findIndex].CHK_YN = "false";
      // const change = item.map((itm) => {
      //   return {
      //     PRODUCT_ID: itm.PRODUCT_ID,
      //     PRODUCT_NAME: itm.PRODUCT_NAME,
      //     PRICE: itm.PRICE,
      //     PRODUCT_CNT: itm.PRODUCT_CNT,
      //     CHK_YN: "false",
      //   };
      // });
      setItems(change);
      // console.log(change);
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
    // console.log("NAME: " + userInfo.userName);
    navigate("/payments", {
      state: {
        // userId: userInfo.userId,
        // userName: userInfo.userName,
        // address: userInfo.address,
        // phoneNumber: userInfo.phoneNumber,
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
    // console.log(e);
    if (item.length === 0) {
      window.alert("죄송합니다. 주문가능한 상품이 없습니다.");
      return;
    }
    const changeData = item
      .filter((itm) => itm.CHK_YN === "true")
      .map((itm) => {
        // console.log(itm);
        return {
          PRODUCT_ID: itm.PRODUCT_ID,
          productId: itm.PRODUCT_ID,
          PRODUCT_NAME: itm.PRODUCT_NAME,
          PRICE: String(itm.PRICE),
          PRODUCT_CNT: String(itm.PRODUCT_CNT),
          CHK_YN: "true",
          orderId: newOrderId,
          totalPrice: totalPrice,
          addr: User.address,
          cnt: String(itm.PRODUCT_CNT),
          userId: User.userId,
        };
      });
    // const changeData = item.map((itm) => {
    //   if (itm.CHK_YN === "true") {
    //     return {
    //       PRODUCT_ID: itm.PRODUCT_ID,
    //       productId: itm.PRODUCT_ID,
    //       PRODUCT_NAME: itm.PRODUCT_NAME,
    //       PRICE: String(itm.PRICE),
    //       PRODUCT_CNT: String(itm.PRODUCT_CNT),
    //       CHK_YN: "true",
    //       orderId: newOrderId,
    //       totalPrice: totalPrice,
    //       addr: userInfo.address,
    //       cnt: String(itm.PRODUCT_CNT),
    //       userId: userInfo.userId,
    //     };
    //   }
    // });
    // console.log(DData);

    axios
      .post(
        "/cart/saveOrder",
        { result: changeData },
        {
          contentType: "application/json",
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.res);
      });

    // axios({
    //   url: "/cart/saveOrder",
    //   method: "post",
    //   data: item,
    // })
    //   .then(function (response) {
    //     // your action after success
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     // your action on error success
    //     console.log(error);
    //   });
    // axios
    //   .post("/cart/saveOrder", [
    //     {
    //       orderId: "20220925000511test",
    //       userId: "test",
    //       totalPrice: "12500",
    //       addr: "test",
    //       productId: "00001",
    //       cnt: "3",
    //     },
    //   ])
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
            {/* <Nav.Link>
              <i class="bi bi-volume-up"></i> 음성듣기
            </Nav.Link> */}
            <Navbar.Collapse>
              <Navbar.Text>
                <a href="#login">{User.userName}님</a>
              </Navbar.Text>
            </Navbar.Collapse>
            <Nav.Link
              as={Link}
              to="/"
              // state={{
              //   userId: userInfo.userId,
              //   userName: userInfo.userName,
              //   address: userInfo.address,
              //   phoneNumber: userInfo.phoneNumber,
              // }}
            >
              <i className="bi bi-house"></i> 홈으로
            </Nav.Link>
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
          </Nav>
        </Container>
      </Navbar>
      <br />
      <h1 className="display-2 text-center">
        <i className="bi bi-cart2"></i>
      </h1>
      <h3 className="text-center">장바구니</h3>
      <br />
      {/* <div className="product-container">
        <div className="row">
          {item.map((itm, i) => {
            return <CartDisplay key={i} i={i} item={item[i]}></CartDisplay>;
          })}
        </div>
      </div> */}

      <div className="container-fluid">
        <Table bordered hover size="sm" className="count-1">
          <thead className="text-center">
            <tr>
              <th>no</th>
              <th>#</th>
              <th>선택</th>
              <th>상품명</th>
              <th>가격</th>
              <th>수량</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-center">
            {item.map((itm) => (
              <tr key={itm.PRODUCT_ID}>
                <td></td>
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
                  {/* <img
                    src={`../image/${itm.PRODUCT_ID}.jpg`}
                    className="productImage2"
                    onKeyDown={(e) => keyPress(e, itm)}
                  ></img> */}
                  <Button
                    variant="flat"
                    onKeyDown={(e) => keyPress(e, itm)}
                    className="text-center"
                  >
                    <img
                      src={`../image/${itm.PRODUCT_ID}.jpg`}
                      className="productImage"
                    ></img>
                  </Button>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  {/* <button onKeyDown={(e) => keyPress(e, itm)}>
                    {itm.cart_id}
                  </button> */}
                </td>
                <td>
                  <br />
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={(e) => {
                      checkHandler(e.currentTarget.checked, itm.PRODUCT_ID);
                    }}
                  ></input>
                </td>
                <td>
                  <br />
                  {itm.PRODUCT_NAME}
                </td>
                <td>
                  <br />총 주문 금액 : {itm.PRICE}원
                </td>
                <td>
                  <br />
                  {itm.PRODUCT_CNT}
                </td>
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
        <h6 className="text-muted">
          <i className="bi bi-info-circle"></i> 수량조절은 원하는 번호를 누르고
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
      <div className="text-center">
        {/* <i class="bi bi-cash"></i>  */}
        {totalPrice}원
      </div>
      <div className="text-center">
        <Button variant="flat2" onClick={insertIntoOrder}>
          <i className="bi bi-truck"></i> 주문하기
        </Button>
        {/* <button>주문하기</button> */}
      </div>
    </div>
  );
}
export default Cart;
