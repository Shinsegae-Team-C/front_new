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
  Table,
} from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router";
axios.defaults.withCredentials = true;
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

const Products = () => {
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

  function insertIntoCart(e, productid) {
    console.log(e);
    console.log(productid);
    axios
      .post("/productlist/saveProduct", {
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

  const { queryId } = useParams(); // const 변수명 = useParams().파라미터명
  const [data, setData] = useState();
  // const [say, setSay] = useState([]);
  const [ourText, setOurText] = useState();
  const msg = new SpeechSynthesisUtterance();

  const shoppingData = async () => {
    // const URL = "/api/main"; //URL이 이상하다고 생각하실겁니다! 아래에 계속 됩니다!
    // const ClientID = "GVxnV9NWdUB0hK0p7LRt";
    // const ClientSecret = "UCFXtO1UJN";
    try {
      const result = await axios
        .post("/main", {
          productName: queryId,
        })
        .then((res) => {
          console.log(res);
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
    shoppingData();
  }, []);
  // const products = [`1번 ${productId}`,`2번${productId}`];
  const speechHandler = (msg) => {
    msg.text = ourText;
    window.speechSynthesis.speak(msg);
  };
  const navigate = useNavigate();
  const backHandler = () => {
    navigate("/search");
  };

  var say = [];
  useEffect(() => {
    if (data != null) {
      data.map((item, idx) =>
        say.push(idx + 1 + "번째 상품" + item.productName)
      );
    }
  }, [data]);
  const speechHandlers = () => {
    // list.map((item) => setSay([...say, item.productName]));
    msg.text = say;
    window.speechSynthesis.speak(msg);
    // console.log(msg);
  };
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
      {/* <h3>{productId}번 상품 페이지 입니다.</h3> */}
      {/* <h1>React Text to Speech App</h1>
      <h2>상품리스트</h2> */}
      <br />
      <p class="text-center">
        <h1 class="display-2">
          <i class="bi bi-shop"></i>
        </h1>
        <h3>상품 검색 결과</h3>
      </p>
      <Container class="text-center">
        <Row>
          <Col></Col>
          <Col>
            {" "}
            <input
              type="text"
              className="form-control mt-1"
              value={ourText}
              onChange={(e) => setOurText(e.target.value)}
              placeholder="말하기 버튼을 누르고 말씀해주세요 :)"
            />
          </Col>
          <Col></Col>
        </Row>
        <br />
        <div>
          <Table bordered over size="sm">
            <thead>
              <th>상품 번호</th>
              <th>상품 이미지</th>
              <th>상품명</th>
              <th>가격</th>
              <th></th>
            </thead>
            <tbody>
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
            width: 100px;
          }
        `}
              </style>
              {data &&
                data.map((item) => (
                  <tr>
                    {/* <ul key={item.productId}> */}
                    <td>{item.productId}</td>
                    <td>{item.productImg}</td>
                    {/* <li>{item.productImg}</li> */}
                    <td>
                      <a href={`/product/${item.productId}`}>
                        {item.productName}
                      </a>
                    </td>
                    {/* <li>
                      <a href={`/product/${item.productId}`}>
                        {item.productName}
                      </a>
                    </li> */}
                    <td>{item.price}</td>
                    {/* <li>{item.price}</li> */}
                    {/* <li>{item.productId}</li> */}
                    {/* <button onClick={speechHandlers(item.productName)}>speech</button> */}
                    {/* </ul> */}
                    <td width="10px">
                      <Button
                        variant="flat"
                        onClick={(e) => insertIntoCart(e, item.productId)}
                      >
                        <h3 class="text-center">
                          <i class="bi bi-cart-plus"></i>
                        </h3>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        <Row>
          <Col></Col>
          <Col class="text-center">
            {" "}
            {say && (
              <Button variant="flat" onClick={speechHandlers}>
                <i class="bi bi-mic"></i>말하기
              </Button>
            )}
            {/* <Button variant="flat" onClick={() => speechHandler(msg)}>
              <i class="bi bi-mic"></i>말하기
            </Button> */}
            {/* {
    say && <button onClick={speechHandlers}>출력</button>;
  } */}
          </Col>
          <Col></Col>
        </Row>
        {/* <Row>
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
            {" "}
            <Button variant="flat" onClick={() => backHandler()}>
              <i class="bi bi-search"></i> 상품검색
            </Button>
          </Col>
          <Col></Col>
        </Row> */}
      </Container>
      {/* <input
        type="text"
        value={ourText}
        onChange={(e) => setOurText(e.target.value)}
      /> */}
      {/* <button onClick={() => speechHandler(msg)}>
        <i class="bi bi-mic"></i>말하기
      </button> */}
      {/* <button onClick={() => speechHandlers(products)}>SPEAK</button> */}

      {/* <button class="flat" onClick={() => backHandler()}>
        {" "}
        <i class="bi bi-search"></i> 상품검색
      </button> */}
    </div>
  );
};

export default Products;
