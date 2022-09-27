import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as React from "react";
import Cart from "./Cart";
import Login from "./Login";
import Join from "./Join";
import Search from "./Search";
import Products from "./Products";
import Main from "./Main";
import AxiosTest from "./AxiosTest"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/join" element={<Join />}></Route>
				<Route path="/search" element={<Search />}></Route>
        <Route path="/products/:productId" element={<Products />}></Route>
        <Route path="/axiostest/:queryId" element={<AxiosTest />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
