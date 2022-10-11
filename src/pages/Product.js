import "../App.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router";
import { Container, Navbar, Nav, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

const Product = () => {
  let navigate = useNavigate();
  const { productId } = useParams();
  const [data, setData] = useState([]);
  // const msg = new SpeechSynthesisUtterance();

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

  function toProducts() {
    navigate(`/products/${userInfo.productSearchName}`, {
      state: {
        userId: userInfo.userId,
        userName: userInfo.userName,
        address: userInfo.address,
        phoneNumber: userInfo.phoneNumber,
        productSearchName: userInfo.productSearchName,
      },
    });
  }
  // const shoppingData = async () => {
  //   // const URL = "/productlist/selectProductList"; //URL이 이상하다고 생각하실겁니다! 아래에 계속 됩니다!
  //   // const ClientID = "GVxnV9NWdUB0hK0p7LRt";
  //   // const ClientSecret = "UCFXtO1UJN";
  //   try {
  //     const res = await axios.post(
  //       `/productlist/selectProductList?productId=${productId}`,
  //       {
  //         // headers: {
  //         //   "X-Naver-Client-Id": ClientID,
  //         //   "X-Naver-Client-Secret": ClientSecret,
  //         // },
  //       }
  //     );
  //     setData(res.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  const getProductData = async () => {
    try {
      const result = await axios
        .post("/productlist/selectProductItem", {
          productId: productId,
        })
        .then((res) => {
          // console.log("here");
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);
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
              src="../image/puu.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            />
            소소배송
          </Navbar.Brand>
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
          </Nav>
        </Container>
      </Navbar>
      <br />
      <p class="text-center">
        <h1 class="display-2">
          <i class="bi bi-handbag"></i>
        </h1>
      </p>
      <Container>
        <Row>
          <Col></Col>
          <Col class="text-center" xs={2}>
            {" "}
            <h3>상품 상세페이지</h3>
          </Col>
          <Col></Col>
        </Row>
        <br />
        <br />
        <Row>
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
          <Col xs={5}>
            <h1 class="display-2">
              <img
                src={`../image/${productId}.jpg`}
                className="productImage2"
              ></img>
            </h1>
          </Col>
          <Col xs={3}>
            <br />
            <h1>{data.PRODUCT_NAME}</h1>
            {/* <p>상품명 : </p> */}
            <p class="lead">
              {" "}
              {"  "}₩ {data.PRICE}
            </p>
            {/* <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title class="text-center"></Card.Title>
                <Card.Text class="text-center">
                  <br />
                  <label>상품명 : </label>
                  <br />
                  <label>가격 : 5,000,000</label>
                </Card.Text>
              </Card.Body>
            </Card> */}
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col xs={3}>
            {" "}
            <Button variant="flat" onClick={toProducts}>
              <i class="bi bi-search"></i> 상품 목록
            </Button>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
    // <div>
    //   <h3>{productId}번 상품 페이지 입니다.</h3>
    // </div>
  );
};

export default Product;
