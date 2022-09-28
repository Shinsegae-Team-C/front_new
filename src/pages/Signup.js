import '../css/App(Singup).css'
import '../App.css';
import { useState } from "react"
import Axios from "axios"

function Signup() {
  const [userId, setId] = useState("");
  const [userPw, setPw] = useState("");
  const [userName, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [userList, setUserList] = useState([]);

  const addUser = () => {
    Axios.post('/user/signUp',{
      userId: userId,
      userPw: userPw,
      userName: userName, 
      address: address, 
      phoneNumber: phoneNumber, 
    }).then(()=>{
      console.log("success");
    });
  };

  const getUser = () => {
    Axios.post('/user').then((response) => {
      setUserList(response.data);
    });
  };

  return <div className="App">
    <div className="signup">
      <label>회원가입</label>
      <label>{"\n"}</label>
    </div>
    <div className="information">
    <label>ID:</label>
      <input
        type="text"
        onChange={(event) => {
          setId(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPw(event.target.value);
        }}
      />
      <label>Name:</label>
      <input
        type="text"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <label>Address:</label>
      <input 
      type="text" 
      onChange={(event) => {
        setAddress(event.target.value);
      }}
      />
      <label>phonenumber:</label>
      <input
        type="text"
        onChange={(event) => {
          setPhoneNumber(event.target.value);
        }}
      />      
      <button onClick={addUser}>회원 가입</button>
    </div>
    <div className='users'>
      <button onClick={getUser}>Show User</button>

      {userList.map((val,key)=>{
        return (<div className='user'>
          <h3>ID: {val.userId}</h3>
          <h3>Password: {val.userPw}</h3>
          <h3>Name: {val.userName}</h3>
          <h3>address: {val.address}</h3>
          <h3>phonenumber: {val.phoneNumber}</h3>
          </div>
        );
      })}
    </div>
  </div>;
}

export default Signup;
