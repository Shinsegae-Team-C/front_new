import React from "react";
import { useState } from "react";
import "./App.css";

function Cart() {
  const [totalPrice, setTotalPrices] = useState(0);
  const [item, setItems] = useState([
    { cart_id: 1, name: "a", price: 2000, product_cnt: 1, check: "false" },
    { cart_id: 2, name: "b", price: 3000, product_cnt: 2, check: "false" },
    { cart_id: 3, name: "c", price: 4000, product_cnt: 3, check: "false" },
  ]);

  //x버튼 누르면 해당 상품 삭제
  const deleteItem = (id) => {
    const newItems = item.filter((itm) => itm.cart_id !== id);
    const delItem = item.filter((itm) => itm.cart_id === id)[0];
    console.log(item);
    if (delItem.check === "true") {
      setTotalPrices(totalPrice - delItem.price * delItem.product_cnt);
    }
    setItems(newItems);
  };

  //선택한 상품의 가격들만 합치기 -> 총 가격
  const checkHandler = (checked, id) => {
    const product = item.filter((itm) => itm.cart_id === id)[0];
    if (checked) {
      setTotalPrices(totalPrice + product.price * product.product_cnt);
      const change = item.map((itm) => {
        return {
          ...item,
          cart_id: itm.cart_id,
          name: itm.name,
          price: itm.price,
          product_cnt: itm.product_cnt,
          check: "true",
        };
      });
      setItems(change);
    } else {
      setTotalPrices(totalPrice - product.price * product.product_cnt);
      const change = item.map((itm) => {
        return {
          ...item,
          cart_id: itm.cart_id,
          name: itm.name,
          price: itm.price,
          product_cnt: itm.product_cnt,
          check: "false",
        };
      });
      setItems(change);
      console.log(change);
    }
  };

  //수량 방향키로 조절하는 거  37:왼쪽, 39:오른쪽 방향키
  const keyPress = (event, target) => {
    const subtractQty = item.map((itm) => {
      if (itm.cart_id === target.cart_id) {
        if (event.keyCode === 37 && itm.product_cnt >= 1) {
          if (itm.check === "true") {
            setTotalPrices(totalPrice - itm.price);
          }
          return {
            ...item,
            cart_id: itm.cart_id,
            name: itm.name,
            price: itm.price,
            product_cnt: itm.product_cnt - 1,
            check: itm.check,
          };
        }
        if (event.keyCode === 39) {
          if (itm.check === "true") {
            setTotalPrices(totalPrice + itm.price);
          }
          return {
            ...item,
            cart_id: itm.cart_id,
            name: itm.name,
            price: itm.price,
            product_cnt: itm.product_cnt + 1,
            check: itm.check,
          };
        }
      } else return itm;
    });
    setItems(subtractQty);
  };
  //화면 단
  return (
    <div>
      <div>
        <h1>Shopping Cart</h1>
      </div>
      <table class="table">
        <thead>
          <th>#</th>
          <th>선택</th>
          <th>상품명</th>
          <th>가격</th>
          <th>수량</th>
          <th></th>
        </thead>
        <tbody>
          {item.map((itm) => (
            <tr>
              <td>
                <button onKeyDown={(e) => keyPress(e, itm)}>
                  {itm.cart_id}
                </button>
              </td>
              <td>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    checkHandler(e.currentTarget.checked, itm.cart_id);
                  }}
                ></input>
              </td>
              <td>{itm.name}</td>
              <td>{itm.price}원</td>
              <td>{itm.product_cnt}</td>
              <td>
                <button onClick={() => deleteItem(itm.cart_id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>총 가격 : {totalPrice}원</div>
      <div>
        <button>주문하기</button>
      </div>
    </div>
  );
}
export default Cart;
