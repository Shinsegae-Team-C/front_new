import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
axios.defaults.withCredentials = true;
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

const AxiosTest = () => {
  const { queryId } = useParams();
  const [data, setData] = useState();
  const msg = new SpeechSynthesisUtterance();
  const shoppingData = async () => {
    const URL = "/main"; //URL이 이상하다고 생각하실겁니다! 아래에 계속 됩니다!
    // const ClientID = "GVxnV9NWdUB0hK0p7LRt";
    // const ClientSecret = "UCFXtO1UJN";
    try {
      const res = await axios
        .post(URL, {
          // params: {
          productName: queryId,
          // display: 5,
          // },

          // headers: {
          //   "X-Naver-Client-Id": ClientID,
          //   "X-Naver-Client-Secret": ClientSecret,
          // },
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

  const speechHandlers = (list) => {
    msg.text = list
    window.speechSynthesis.speak(msg)
  }

  return (<div>
    <h2>상품리스트</h2>
    {data && data.items.map((item, idx) => {
      const oldTextArticle = item.title;
      const newTextArticle = oldTextArticle.replace(/(<([^>]+)>)/ig, "").replace(/&quot;/g, "").replace(/\"n/, "").replace(/&amp;/g, "");
      return <p><button onClick={() => speechHandlers(idx + 1 + '번째 상품' + newTextArticle)}>SPEAK</button>{idx + 1}<a href={item.link}>{newTextArticle}</a></p>;
    })}
  </div>);
}

export default AxiosTest;