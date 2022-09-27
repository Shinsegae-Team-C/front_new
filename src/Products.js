import "./App.css"
import { useState } from "react"
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Products = () => {
  const { productId } = useParams(); // const 변수명 = useParams().파라미터명;
  const [ourText, setOurText] = useState(productId)
  const msg = new SpeechSynthesisUtterance()
  const products = [`1번 ${productId}`,`2번${productId}`];
  const speechHandler = (msg) => {
    msg.text = ourText
    window.speechSynthesis.speak(msg)
  }
  const navigate = useNavigate();
  const backHandler = () => {
    navigate("/search")
  }
  const speechHandlers = (list) => {
    msg.text = ourText
    window.speechSynthesis.speak(msg)
  }
  return (
    <div className='App'>
      <h3>{productId}번 상품 페이지 입니다.</h3>
      <h1>React Text to Speech App</h1>
      
      <input
        type='text'
        value={ourText}
        onChange={(e) => setOurText(e.target.value)}
      />
      <button onClick={() => speechHandler(msg)}>SPEAK</button>
      <button onClick={() => speechHandlers(products)}>SPEAK</button>
      <button onClick={() => backHandler()}>back</button>
    </div>
  )
}

export default Products