import React from 'react';
import { Link } from 'react-router-dom';
import {useState} from 'react';

const Main = (props) => {
	const [isAuth, setIsAuth] = useState(false); 
	console.log(isAuth);
	return (
		<>
			<h3>안녕하세요. 메인페이지 입니다.</h3>
      {!isAuth &&<ul>
				<Link to="/login"><li>로그인</li></Link>
				<Link to="/join"><li>회원가입</li></Link>
			</ul>}
			{isAuth && <ul>
				<Link to="/cart"><li>장바구니</li></Link>
				<Link to="/search"><li>검색창</li></Link>
				<Link to="/products"><li>상품리스트</li></Link>
			</ul>}
		</>
	);
};

export default Main;