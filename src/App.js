import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as React from "react";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import Products from "./pages/Products";
import Main from "./pages/Main";
import AxiosTest from "./pages/AxiosTest";
import Order from "./pages/Order";
import Payments from "./pages/Payments";
import Product from "./pages/Product";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
				<Route path="/search" element={<Search />}></Route>
				<Route path="/order" element={<Order />}></Route>
				<Route path="/payments" element={<Payments />}></Route>
				<Route path="/products/:queryId" element={<Products />}></Route>
        <Route path="/product/:productId" element={<Product />}></Route>
        <Route path="/axiostest/:queryId" element={<AxiosTest />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
