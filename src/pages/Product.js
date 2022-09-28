import "../App.css"
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const { productId } = useParams();
  const [data, setData] = useState();
  // const msg = new SpeechSynthesisUtterance();
  const shoppingData = async () => {
    // const URL = "/productlist/selectProductList"; //URL이 이상하다고 생각하실겁니다! 아래에 계속 됩니다!
    // const ClientID = "GVxnV9NWdUB0hK0p7LRt";
    // const ClientSecret = "UCFXtO1UJN";
    try {
      const res = await axios
      .post(`/productlist/selectProductList?productId=${productId}`, {
        
        // headers: {
        //   "X-Naver-Client-Id": ClientID,
        //   "X-Naver-Client-Secret": ClientSecret,
        // },
      })
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
      <h3>{productId}번 상품 페이지 입니다.</h3>
      
    </div>
  )
}

export default Product