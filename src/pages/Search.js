import { useState, useEffect } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import navigateSearch from "../sounds/navigate.mp3";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router";

const Search = () => {
  const location = useLocation();
  const userInfo = location.state;
  const [User, setUser] = useState(Object);

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("info")));
  }, []);

  console.log(User);

  useEffect(() => {
    if (userInfo != null) {
      // const userId = userInfo.userId;
      // const userName = userInfo.userName;
      // const address = userInfo.address;
      // const phoneNumber = userInfo.phoneNumber;
    }
  });
  //안내 음성을 출력하기 위한 오디오 함수
  const useAudio = (url) => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
    const toggle = () => setPlaying(!playing);

    useEffect(() => {
      //playing 값에 따라 오디오 재생 / 오디오 정지
      playing ? audio.play() : audio.pause();
    }, [playing]);

    useEffect(() => {
      //오디오가 끝나면 playing 변수의 값을 false로 바꿈
      audio.addEventListener("ended", () => setPlaying(false));
      return () => {
        audio.removeEventListener("ended", () => setPlaying(false));
      };
    }, []);

    return [audio, playing, toggle];
  };

  const [audio, playing, toggle] = useAudio(navigateSearch);

  useEffect(() => {
    toggle();
  }, []);

  const [value, setValue] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      // 음성인식 결과가 value에 저장
      setValue(result);
    },
  });

  const msg = new SpeechSynthesisUtterance();
  useEffect(() => {
    // 안내 음성이 끝났을 때 인식
    if (!playing) {
      // 말하는 도중이 아닌 말이 끝난 뒤(말 사이 텀이 생기면) 출력
      listen({ interimResults: false });
    }
  }, [playing]);

  const navigate = useNavigate();

  var order = "원하시는 상품이 ";
  var voices = window.speechSynthesis.getVoices();
  const [productId, setProductId] = useState("");
  useEffect(() => {
    if (value.includes("처음")) {
      // console.log(value.length);
      stop(); // 마이크 off
      setTimeout(function () {
        //사용자가 결과를 확인할 수 있도록 2초 뒤 이동
        // navigate("/search"); // 다음 페이지로 이동
        window.location.reload();
      }, 2000);
    } else if (value.includes("주문")) {
      stop();
      setProductId(value.replace("주문", "").trim());
      order += value.replace("주문", "").trim();
      order += "입니까?";
      console.log(voices);
      const speechHandler = () => {
        msg.voice = voices[0];
        msg.volume = 1;
        msg.rate = 0.9;
        msg.pitch = 1;
        msg.lang = "ko-kr";
        msg.text = order;
        console.log(msg);
        setTimeout(function () {
          window.speechSynthesis.speak(msg);
        }, 1000);
      };
      speechHandler();
    }
    stop();
  }, [value]);

  useEffect(() => {
    setTimeout(function () {
      listen({ interimResults: false });
      if (value.includes("아니요")) {
        stop(); // 마이크 off
        setTimeout(function () {
          // navigate("/search");
          window.location.reload();
        }, 1000);
      } else if (value.includes("네")) {
        console.log(value);
        stop();
        setTimeout(function () {
          console.log(productId);
          navigate(`/products/${productId}`, {
            // state: {
            //   userId: userInfo.userId,
            //   userName: userInfo.userName,
            //   address: userInfo.address,
            //   phoneNumber: userInfo.phoneNumber,
            //   productSearchName: productId,
            // },
          });
        }, 1000);
      }
      // stop();
    }, 3000);
  }, [msg]);

  // useEffect(() => {
  //   if (value.includes("처음")) {
  //     console.log(value.length);
  //     stop(); // 마이크 off
  //     setTimeout(function () {
  //       //사용자가 결과를 확인할 수 있도록 2초 뒤 이동
  //       navigate("/"); // 다음 페이지로 이동
  //     }, 2000);
  //   } else if (value.includes("주문")) {
  //     stop();
  //     const order = value.replace("주문", "").trim();
  //     setTimeout(function () {
  //       navigate(`/products/${order}`, {
  //         state: {
  //           userId: userInfo.userId,
  //           userName: userInfo.userName,
  //           address: userInfo.address,
  //           phoneNumber: userInfo.phoneNumber,
  //           productSearchName: order,
  //         },
  //       });
  //     }, 2000);
  //   }
  // }, [value]);
  return (
    // <>
    //   <h1>SoundTestPage</h1>
    // <div className="answer">{value}</div>
    // {listening && <div>인식 중</div>}
    // </>
    <div muted="muted">
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
              alt=""
            />
            소소배송
          </Navbar.Brand>
          <Nav>
            {/* <Nav.Link>
              <i className="bi bi-volume-up"></i> 음성듣기
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
          </Nav>
        </Container>
      </Navbar>
      <br />
      <h1 className="display-2 text-center">
        <i className="bi bi-search"></i>
      </h1>
      <h3 className="text-center">상품검색</h3>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            {" "}
            <input
              type="text"
              className="form-control mt-1"
              // placeholder="아래 마이크를 눌러주세요 :)"
              value={value}
              readOnly
            />
          </Col>
          {/* <div className="answer">{value}</div>
      {listening && <div>인식 중</div>} */}
          <Col></Col>
        </Row>
      </Container>
      <br />
      <br />
      <div className="text-center">
        <img
          src="image/voice-search.png"
          width="300"
          height="300"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </div>
    </div>
  );
};

export default Search;
