import "../App.css";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router";
import { useSpeechRecognition } from "react-speech-kit";
axios.defaults.withCredentials = true;
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

const Products = () => {
  const location = useLocation();

  const userInfo = location.state;

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

  function insertIntoCart(e, productid) {
    // console.log(e);
    // console.log(productid);
    window.alert("상품이 담겼습니다.");
    axios
      .post("/productlist/saveProduct", {
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
  // const toProductDetail = (productId) => {
  // navigate(`/product/${productId}`, {
  //   state: {
  //     productId: productId,
  //   },
  // });
  // };

  function toProductDetail(e, productId) {
    // console.log(productId);
    // console.log(userInfo.productSearchName);
    navigate(`/product/${productId}`, {
      state: {
        productId: productId,
        // productSearchName: userInfo.productSearchName,
      },
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
      // const result = await axios
      //   .post("/main", {
      //     productName: queryId,
      //   })
      //   .then((res) => {
      //     console.log(res);
      //     setData(res.data);
      //     if (res.data.length == 0) {
      //       window.alert("검색어와 일치하는 상품이 없습니다.");
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      await axios
        .post("/main", {
          productName: queryId,
        })
        .then((res) => {
          console.log(res);
          setData(res.data);
          if (res.data.length === 0) {
            window.alert("검색어와 일치하는 상품이 없습니다.");
          }
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
  // const speechHandler = (msg) => {
  //   msg.text = ourText;
  //   window.speechSynthesis.speak(msg);
  // };
  const navigate = useNavigate();
  // const backHandler = () => {
  //   navigate("/search");
  // };

  const toCart = () => {
    navigate("/cart", {
      // state: {
      //   userId: userInfo.userId,
      //   userName: userInfo.userName,
      //   address: userInfo.address,
      //   phoneNumber: userInfo.phoneNumber,
      // },
    });
  };

  var say = [];
  useEffect(() => {
    if (data != null) {
      data.map((item, idx) =>
        say.push(idx + 1 + "번째 상품" + item.productName)
      );
      say.push(" 원하시는 상품의 번호를 말해주세요");
    }
  }, [data]);

  var synth = window.speechSynthesis;

  const speechHandlers = () => {
    // list.map((item) => setSay([...say, item.productName]));
    msg.text = say;
    msg.voice = synth.getVoices()[0];
    synth.speak(msg);
    // console.log(msg);
  };

  const [value, setValue] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      // 음성인식 결과가 value에 저장
      setValue(result);
    },
  });
  useEffect(() => {
    speechHandlers();
    setTimeout(function () {
      listen({ interimResults: false });
      // console.log(value);
    }, 1000);
  }, [msg]);

  useEffect(() => {
    stop();
    console.log(value);
  }, [value]);

  const [selectpid, setSelectpid] = useState("");
  const [proId, setProId] = useState();
  const movePg = (e) => {
    var pnm = ["0"];
    // var proId = '';
    if (e.keyCode > 48 && e.keyCode < 58) {
      const pid = new SpeechSynthesisUtterance();
      setSelectpid(e.keyCode - 48);
      setProId(data[e.keyCode - 49]);

      data.map((item, idx) => {
        pnm[idx + 1] = item.productName;
      });
      // console.log(proId);
      pid.text = e.keyCode - 48 + "번째 상품" + pnm[e.keyCode - 48];
      // console.log(e.keyCode-48+pnm[e.keyCode-48]);
      window.speechSynthesis.speak(pid);
      // console.log(selectpid);
    } else if (selectpid && e.keyCode === 13) {
      // console.log(selectpid+'번 상품으로 이동!');
      console.log(proId);
      console.log(userInfo);
      setTimeout(function () {
        console.log(userInfo.productSearchName);
        navigate(`/product/${proId.productId}`, {
          // state: {
          //   userId: userInfo.userId,
          //   userName: userInfo.userName,
          //   address: userInfo.address,
          //   phoneNumber: userInfo.phoneNumber,
          //   productSearchName: userInfo.productSearchName,
          // },
        });
      }, 1000);
    }
  };

  const btnStyle = {
    color: "black",
    background: "white",
    // padding: ".300rem .75rem",
    border: "1px solid white",
    borderRadius: ".25rem",
    fontSize: "1rem",
    lineHeight: 1.5,
    height: "auto",
    width: "75px",
  };
  function ProductDisplay({ data, i }) {
    console.log(i);

    return (
      <>
        <div className="col-md-4 text-center">
          <img
            src={`../image/${data.productId}.jpg`}
            className="productImage"
            onClick={(e) => toProductDetail(e, data.productId)}
          ></img>
          {/* <Button variant="flat" onKeyDown={(e) => keyPress(e, item)}>
            {item.PRODUCT_ID}
          </Button> */}
          <br />
          {/* <button style={btnStyle} onKeyDown={(e) => keyPress(e, item)}>
            {item.PRODUCT_ID}
          </button> */}
          {/* <Button
                        variant="flat"
                        onClick={(e) => insertIntoCart(e, item.productId)}
                      >
                        <h3 class="text-center">
                          <i class="bi bi-cart-plus"></i>
                        </h3>
                      </Button> */}
          <h5>{data.productName}</h5>
          {/* 상품번호: {data.productId}
            <br /> */}
          {data.price}원
          <br />
          <button
            style={btnStyle}
            onClick={(e) => insertIntoCart(e, data.productId)}
          >
            <h5 className="text-center">
              <i className="bi bi-cart-plus"></i>
            </h5>
          </button>
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
      {/* <h3>{productId}번 상품 페이지 입니다.</h3> */}
      {/* <h1>React Text to Speech App</h1>
      <h2>상품리스트</h2> */}
      <br />
      <h1 className="display-2 text-center">
        <i className="bi bi-shop"></i>
      </h1>
      <h3 className="text-center">상품 검색 결과</h3>
      <Container className="text-center">
        <Row>
          <Col></Col>
          <Col>
            {" "}
            <input
              type="text"
              className="form-control mt-1"
              // value={ourText}
              // onChange={(e) => setOurText(e.target.value)}
              // placeholder="말하기 버튼을 누르고 말씀해주세요 :)"
              value={selectpid}
              onChange={(e) => setOurText(e.target.value)}
              onKeyDown={(e) => movePg(e)}
              autoFocus
            />
          </Col>
          <Col></Col>
        </Row>
        <br />
        <div className="product-container">
          <div className="row">
            {data &&
              data.map((itm, i) => {
                return (
                  <ProductDisplay key={i} i={i} data={data[i]}></ProductDisplay>
                );
              })}
          </div>
        </div>
        {/* <div>
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
                    {/* <ul key={item.productId}> 
                    <td>{item.productId}</td>
                    <td>{item.productImg}</td>
                    {/* <li>{item.productImg}</li> 
                    <td>
                      <a href={`/product/${item.productId}`}>
                        {item.productName}
                      </a>
                    </td>
                    {/* <li>
                      <a href={`/product/${item.productId}`}>
                        {item.productName}
                      </a>
                    </li> *
                    <td>{item.price}</td>
                    {/* <li>{item.price}</li> */}
        {/* <li>{item.productId}</li> */}
        {/* <button onClick={speechHandlers(item.productName)}>speech</button> */}
        {/* </ul> 
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
        </div> */}
        <Row>
          <Col></Col>
          <Col className="text-center">
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
            </style>{" "}
            {say && (
              <Button variant="flat" onClick={speechHandlers}>
                <i className="bi bi-volume-up"></i>음성 듣기
              </Button>
            )}
            <Button variant="flat" onClick={toCart}>
              <i className="bi bi-cart2"></i>장바구니로 가기
            </Button>
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
