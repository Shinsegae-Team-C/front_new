import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
axios.defaults.withCredentials = true;
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

const AxiosTest = () => {
  const { queryId } = useParams();
  const [data, setData] = useState();
  const [say, setSay] = useState([]);
  const msg = new SpeechSynthesisUtterance();
  const shoppingData = async () => {
    // const URL = "/api/main"; //URL이 이상하다고 생각하실겁니다! 아래에 계속 됩니다!
    // const ClientID = "GVxnV9NWdUB0hK0p7LRt";
    // const ClientSecret = "UCFXtO1UJN";
    try {
      const res = await axios.post(
        `/main?productName=${queryId}`,
        {},
        {
          // params: {
          productName: queryId,
        },
        { withCredentials: true }
      );
      setData(res.data);
      // setTimeout(()=>{speechHandlers(res.data);},5000);

      // speechHandlers(data.productName)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    shoppingData();
  }, []);
  // useEffect(()=>{
  //   console.log(data[0]);
  // },[data]);

  const speechHandlers = (list) => {
    list.map((item) => setSay([...say, item.productName]));
    msg.text = say;
    window.speechSynthesis.speak(msg);
    console.log(say);
  };

  return (
    <div>
      <h2>상품리스트</h2>
      <div>
        {data &&
          data.map((item) => (
            <ul key={item.productId}>
              <li>{item.productImg}</li>
              <li>
                <a href={`/product/${item.productId}`}>{item.productName}</a>
              </li>
              <li>{item.price}</li>
              <li>{item.productId}</li>
              {/* <button onClick={speechHandlers(item.productName)}>speech</button> */}
            </ul>
          ))}
      </div>
    </div>
  );
};

export default AxiosTest;
