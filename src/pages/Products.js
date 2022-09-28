import "../App.css"
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

const Products = () => {
  const { queryId } = useParams(); // const 변수명 = useParams().파라미터명
  const [data, setData] = useState();
  const [say, setSay] = useState([]);
  const [ourText, setOurText] = useState()
  const msg = new SpeechSynthesisUtterance()

  const shoppingData = async () => {
    // const URL = "/api/main"; //URL이 이상하다고 생각하실겁니다! 아래에 계속 됩니다!
    // const ClientID = "GVxnV9NWdUB0hK0p7LRt";
    // const ClientSecret = "UCFXtO1UJN";
    try {
      const res = await axios
        .post(`/main?productName=${queryId}`,{}, {
          productName: queryId
        }, 
          { withCredentials: true },
        )
      setData(res.data);
    } catch (e) {
      console.log(e);
    }

  };
  useEffect(() => {
    shoppingData();
  }, []);
  // const products = [`1번 ${productId}`,`2번${productId}`];
  const speechHandler = (msg) => {
    msg.text = ourText
    window.speechSynthesis.speak(msg)
  }
  const navigate = useNavigate();
  const backHandler = () => {
    navigate("/search")
  }
  return (
    <div className='App'>
      {/* <h3>{productId}번 상품 페이지 입니다.</h3> */}
      <h1>React Text to Speech App</h1>
      <h2>상품리스트</h2>
    <div>
    {data && 
    data.map((item) => (
      <ul key={item.productId}>
        <li>{item.productImg}</li>
        <li><a href={`/product/${item.productId}`}>{item.productName}</a></li>
        <li>{item.price}</li>
        <li>{item.productId}</li>
        {/* <button onClick={speechHandlers(item.productName)}>speech</button> */}
      </ul>
    ))
    }</div>
      <input
        type='text'
        value={ourText}
        onChange={(e) => setOurText(e.target.value)}
      />
      <button onClick={() => speechHandler(msg)}>SPEAK</button>
      {/* <button onClick={() => speechHandlers(products)}>SPEAK</button> */}
      <button onClick={() => backHandler()}>back</button>
    </div>
  )
}

export default Products