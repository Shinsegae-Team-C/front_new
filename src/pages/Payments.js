import '../App.css';
import { useState } from "react";
import Axios from "axios";
import '../css/App(Payments).css';

function Payments() {

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhonenumber] = useState("");

  const [userList, setUserList] = useState([]);


  Axios.post('http://localhost:3001/user').then((response) => {
    setUserList(response.data);
  });

  return <div className="App">
    <div className="information">
      <label>이름:{name}</label>
      <label>주소:{address}</label>
      <label>번호:{phonenumber}</label>
    </div>

    <div className="lableline">
      <th>상품이름{"     "}</th>
      <th>수량{"     "}</th>
      <th>가격</th>
    </div>

    <div className='users'>     
      {userList.map((val,key)=>{
        //백앤드 연결후 이름,수량 가격
        return (<div className='user'>
          <h3>{val.userName}</h3>
          <h3>{val.address}</h3>
          <h3>{val.phoneNumber}</h3>
          </div>
        );
      })}
    </div>
    <div className='totalpirce'> 
      <t1>총액</t1>
    </div> 
    <div className='payment'> 
      <t1>카드</t1>
      <t1>현금</t1>
      <t1>취소</t1>
    </div>    
  </div>
}

export default Payments;
