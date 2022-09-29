import { useState, useEffect } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import navigateSearch from "../sounds/navigate.mp3";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, Row, Col } from "react-bootstrap";

const Search = () => {
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

  useEffect(() => {
    // 안내 음성이 끝났을 때 인식
    if (!playing) {
      // 말하는 도중이 아닌 말이 끝난 뒤(말 사이 텀이 생기면) 출력
      listen({ interimResults: false });
    }
  }, [playing]);
  const navigate = useNavigate();
  useEffect(() => {
    if (value.includes("처음")) {
      console.log(value.length);
      stop(); // 마이크 off
      setTimeout(function () {
        //사용자가 결과를 확인할 수 있도록 2초 뒤 이동
        navigate("/"); // 다음 페이지로 이동
      }, 2000);
    } else if (value.includes("주문")) {
      stop();
      const order = value.replace("주문", "");
      setTimeout(function () {
        navigate(`/products/${order}`);
      }, 2000);
    }
  }, [value]);
  return (
    // <>
    //   <h1>SoundTestPage</h1>
    //   <div className="answer">{value}</div>
    //   {listening && <div>인식 중</div>}
    // </>
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
              alt=""
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
          </Nav>
        </Container>
      </Navbar>
      <br />
      <p class="text-center">
        <h1 class="display-2">
          <i class="bi bi-search"></i>
        </h1>
        <h3>상품검색</h3>
      </p>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            {" "}
            <input
              type="text"
              className="form-control mt-1"
              placeholder="아래 마이크를 눌러주세요 :)"
            />
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <br />
      <br />
      <div class="text-center">
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
