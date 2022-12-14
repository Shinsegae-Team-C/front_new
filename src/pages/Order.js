import "../App.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
// import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

function Order() {
  let navigate = useNavigate();
  const location = useLocation();
  const userInfo = location.state;
  // const [name, setName] = useState("");
  // const [address, setAddress] = useState("");
  // const [phonenumber, setPhonenumber] = useState("");
  const [User, setUser] = useState(Object);

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("info")));
  }, []);

  const [userList, setUserList] = useState([]);
  const movePg = (e) => {
    if (e.keyCode === 13) {
      setTimeout(function () {
        navigate("/", {
          // state: {
          //   userId: userInfo.userId,
          //   userName: userInfo.userName,
          //   address: userInfo.address,
          //   phoneNumber: userInfo.phoneNumber,
          // },
        });
      }, 1000);
    } else if (e.keyCode === 81) {
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
    }
    // navigate("/", {
    //   state: {
    //     userId: userData.userId,
    //     userName: userData.userName,
    //     address: userData.address,
    //     phoneNumber: userData.phoneNumber,
    //   },
    // });
    // else if (e.keyCode == 13) {

    // }
  };

  useEffect(() => {
    if (userInfo != null) {
      // const userId = userInfo.userId;
      // const userName = userInfo.userName;
      // const address = userInfo.address;
      // const phoneNumber = userInfo.phoneNumber;
    }
  });

  function toHome() {
    navigate("/", {
      // state: {
      //   userId: userInfo.userId,
      //   userName: userInfo.userName,
      //   address: userInfo.address,
      //   phoneNumber: userInfo.phoneNumber,
      // },
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
              to="/cart"
              state={{
                userId: userInfo.userId,
                userName: userInfo.userName,
                address: userInfo.address,
                phoneNumber: userInfo.phoneNumber,
              }}
            >
              <i class="bi bi-cart2"></i> ????????????
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
      <br />
      <br />
      <h1 className="display-2 text-center">
        <i className="bi bi-cart-check"></i>
      </h1>
      <br />
      <h3 className="text-center">????????? ??????????????? ?????????????????????.</h3>
      <br />
      <div className="container-fluid">
        <h5 className="text-center">???????????? : {userInfo.orderId}</h5>
        <br />
        <h5 className="text-center">????????? ??????</h5>
        <p className="text-center">
          <label>
            <i className="bi bi-person-fill"></i> {User.userName}
          </label>
          <br />
          <label>
            <i className="bi bi-telephone"></i> {User.phoneNumber}
          </label>
          <br />
          <label>
            <i className="bi bi-truck"></i> {User.address}
          </label>
          <br />
        </p>
      </div>
      <div className="text-center">?????? ?????? : {userInfo.orderPrice}???</div>

      {/* <div className="information">
        <label>????????????</label>
      </div> */}

      {/* <div className="lableline">
        <th>????????????{"     "}</th>
        <th>??????{"     "}</th>
        <th>??????</th>
      </div> */}

      <div className="users">
        {userList.map((val, key) => {
          //????????? ????????? ??????,?????? ??????
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
        <Button variant="flat" onClick={toHome}>
          <i className="bi bi-house"></i> ?????????
        </Button>
        {/* <button>????????????</button> */}
      </div>
    </div>
  );
}

export default Order;
