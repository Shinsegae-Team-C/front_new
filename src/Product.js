import "./App.css"
import { useState } from "react"
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Product = () => {
  const { queryId } = useParams();
  const [data, setData] = useState();
  // const msg = new SpeechSynthesisUtterance();
  const shoppingData = async () => {
    const URL = "http://172.28.9.62:8080/productlist/selectProductList"; //URL이 이상하다고 생각하실겁니다! 아래에 계속 됩니다!
    // const ClientID = "GVxnV9NWdUB0hK0p7LRt";
    // const ClientSecret = "UCFXtO1UJN";
    try {
      const res = await axios
      .get(URL, {
        params: {
          query: queryId,
          // display: 5,
        },
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