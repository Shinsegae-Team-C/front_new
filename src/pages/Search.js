import { useState, useEffect } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import navigateSearch from "../sounds/navigate.mp3";
import { useNavigate } from "react-router-dom";


const Search = () => {
  //안내 음성을 출력하기 위한 오디오 함수
  const useAudio = url => {
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
    onResult: result => {
      // 음성인식 결과가 value에 저장
      setValue(result);
    }
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
        setTimeout(function() { //사용자가 결과를 확인할 수 있도록 2초 뒤 이동
          navigate("/"); // 다음 페이지로 이동
        }, 2000);
      } else if (value.includes("주문")) {
        stop();
        const order = value.replace('주문','')
        setTimeout(function() {
          navigate(`/products/${order}`);
        }, 2000);
      }
    }, [value]);  
  return (
    <>
    <h1>SoundTestPage</h1>
    <div className="answer">{value}</div>
     {listening && <div>인식 중</div>}
    </>
  );
};

export default Search;
