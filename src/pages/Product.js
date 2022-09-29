import "../App.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import axios from "axios";

const Product = () => {
  let navigate = useNavigate();
  const { productId } = useParams();
  const [data, setData] = useState();
  // const msg = new SpeechSynthesisUtterance();

  function toProducts() {
    navigate("/products");
  }
  const shoppingData = async () => {
    // const URL = "/productlist/selectProductList"; //URL이 이상하다고 생각하실겁니다! 아래에 계속 됩니다!
    // const ClientID = "GVxnV9NWdUB0hK0p7LRt";
    // const ClientSecret = "UCFXtO1UJN";
    try {
      const res = await axios.post(
        `/productlist/selectProductList?productId=${productId}`,
        {
          // headers: {
          //   "X-Naver-Client-Id": ClientID,
          //   "X-Naver-Client-Secret": ClientSecret,
          // },
        }
      );
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    shoppingData();
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
            {/* <img
              src="image/puu.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            /> */}
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
          <i class="bi bi-handbag"></i>
        </h1>
      </p>
      <Container>
        <Row>
          <Col></Col>
          <Col class="text-center" xs={3}>
            {" "}
            <h3>{productId}번 상품 상세페이지입니다.</h3>
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
          <Col></Col>
          <Col xs={3}>
            <Card style={{ width: "20rem" }}>
              <Card.Body>
                <Card.Title class="text-center">
                  <h1 class="display-2">
                    <i class="bi bi-egg-fried"></i>
                  </h1>
                </Card.Title>
                <Card.Text class="text-center">
                  <label>상품명 : 계란후라이</label>
                  <br />
                  <label>가격 : 5,000,000</label>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col xs={3}>
            {" "}
            <Button variant="flat" onClick={toProducts}>
              <i class="bi bi-search"></i> 상품검색
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
