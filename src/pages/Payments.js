import "../App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router";
import "../css/App(Payments).css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, Button, ButtonGroup } from "react-bootstrap";

function Payments() {
  let navigate = useNavigate();
  const location = useLocation();
  const userInfo = location.state;
  // const [data, setData] = useState([]);
  const [detailData, setDetailData] = useState([]);
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
  const movePg = (e) => {
    if (e.keyCode === 13) {
      setTimeout(function () {
        navigate("/order", {
          state: {
            // userId: userInfo.userId,
            // userName: userInfo.userName,
            // address: userInfo.address,
            // phoneNumber: userInfo.phoneNumber,
            orderId: userInfo.orderId,
            orderPrice: userInfo.orderPrice,
          },
        });
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
  function toOrder() {
    navigate("/order", {
      state: {
        //   userId: userInfo.userId,
        //   userName: userInfo.userName,
        //   address: userInfo.address,
        //   phoneNumber: userInfo.phoneNumber,
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
      // console.log(userInfo.userId);
      // console.log(location.state.orderId);
      // const result = await axios
      //   .post("/order/selectOrderList", {
      //     userId: userInfo.userId,
      //     orderId: location.state.orderId,
      //   })
      //   .then((res) => {
      //     // console.log("here");
      //     // console.log(res.data);
      //     console.log(res);
      //     // console.log(res.data);
      //     // setData(res.data.orderInfo);
      //     setDetailData(res.data.orderDetail);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      await axios
        .post("/order/selectOrderList", {
          userId: User.userId,
          orderId: location.state.orderId,
        })
        .then((res) => {
          // console.log("here");
          // console.log(res.data);
          console.log(res);
          // console.log(res.data);
          // setData(res.data.orderInfo);
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
    // console.log(i);

    return (
      <>
        <div className="text-center col-md-4">
          <img
            src={`image/${itm.PRODUCT_ID}.jpg`}
            className="productImage"
          ></img>
          <h5>{itm.PRODUCT_NAME}</h5>
          <p>
            {itm.PRICE}???
            <br />
            ?????? {itm.CNT} ???
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
            ????????????
          </Navbar.Brand>
          <Nav className="me-auto">
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
              <i className="bi bi-search"></i> ????????????
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
              <i className="bi bi-shop"></i> ????????????
            </Nav.Link> */}
            {/* <Nav.Link
              as={Link}
              to="/cart"
              state={{
                userId: userInfo.userId,
                userName: userInfo.userName,
                address: userInfo.address,
                phoneNumber: userInfo.phoneNumber,
              }}
            >
              <i className="bi bi-cart2"></i> ????????????
            </Nav.Link> */}
          </Nav>
          <Nav>
            {/* <Nav.Link>
              <i class="bi bi-volume-up"></i> ????????????
            </Nav.Link> */}
            <Navbar.Collapse>
              <Navbar.Text>
                <a href="#login">{User.userName}???</a>
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
              <i className="bi bi-house"></i> ?????????
            </Nav.Link>
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
      <br />
      <h1 className="display-2 text-center">
        <i className="bi bi-wallet2"></i>
      </h1>
      {/* <h3>????????????</h3> */}
      <p className="text-center">
        <label>?????? : {User.userName} </label>
        <br />
        <label>?????? : {User.address}</label>
        <br />
        <label>??????: {User.phoneNumber}</label>
      </p>
      <br />
      {/* <div class="container-fluid"> */}
      {/* <Table bordered hover size="sm">
          {/* <thead>
            <th>#</th>
            <th>?????????</th>
            <th>??????</th>
            <th>??????</th>
            <th>??? ??????</th>
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
                <td>{itm.PRICE}???</td>
                <td>?????? {itm.CNT} ???</td>
              </tr>
            ))}
          </tbody>
        </Table> */}
      <div className="product-container">
        <h4 className="text-center ">?????? ?????? : ??? {detailData.length}???</h4>
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
              {itm.PRICE}???
              <br />
              ?????? {itm.CNT} ???
            </p>
          </div>
        ))} */}
      </div>
      {/* </div> */}

      {/* <div className="information">
      <label>??????:{name}</label>
      <label>??????:{address}</label>
      <label>??????:{phonenumber}</label>
    </div> */}

      {/* <div className="lableline">
      <th>????????????{"     "}</th>
      <th>??????{"     "}</th>
      <th>??????</th>
    </div> */}

      {/* <div className='users'>     
      {userList.map((val,key)=>{
        //????????? ????????? ??????,?????? ??????
        return (<div className='user'>
          <h3>{val.userName}</h3>
          <h3>{val.address}</h3>
          <h3>{val.phoneNumber}</h3>
          </div>
        );
      })}
    </div> */}
      {/* <div className='totalpirce'> 
      <t1>??????</t1>
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
            <i className="bi bi-credit-card"></i> ??????
          </Button>
          <Button variant="flat">
            <i className="bi bi-cash-coin"></i> ????????????
          </Button>
          <Button variant="flat">SSGPAY</Button>
        </ButtonGroup>
      </div>
      {/* <div className='payment'> 
      <t1>??????</t1>
      <t1>??????</t1>
      <t1>??????</t1>
    </div>     */}
      <div className="text-center">
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
          ?????? ?????? ?????? : <strong>{location.state.orderPrice}???</strong>
        </h5>
        <Button variant="flat2" onClick={toOrder}>
          ????????????
        </Button>
      </div>
    </div>
  );
}

export default Payments;
