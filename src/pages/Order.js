import '../App.css';
import { useState } from "react"
import Axios from "axios"

function Order() {

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhonenumber] = useState("");

  const [userList, setUserList] = useState([]);


  Axios.post('/user').then((response) => {
    setUserList(response.data);
  });

  return <div className="App">
    <div className="information">
      <label>주문완료</label>
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
  </div>
}

export default Order;
