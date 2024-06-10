import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./Redux/store";
import React, { useEffect } from "react";
import { loadUser } from "./Redux/actions/UserActions";

import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import ProductDetails from "./Pages/ProductDetails";
import Products from "../src/Pages/Products";
import Search from "./Pages/Search";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile.js";
import UpdateProfile from "./Pages/UpdateProfile.js";
import UpdatePassword from "./Pages/UpdatePassword.js";
import ForgotPassword from "./Pages/ForgotPassword.js";
import ResetPassword from "./Pages/ResetPassword.js";
import Shipping from "./Pages/Shipping.js";
import ConfirmOrder from "./Pages/ConfirmOrder.js";
import OrderSuccess from "./Pages/OrderSuccess.js";
import MyOrders from "./Pages/MyOrders.js";
import OrderDetails from "./Pages/OrderDetails.js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js";
import NewProduct from "./component/admin/NewProduct.js";
import UpdateProduct from "./component/admin/UpdateProduct.js";
import OrderList from "./component/admin/OrderList.js";
import ProcessOrder from "./component/admin/ProcessOrder.js";
import UsersList from "./component/admin/UsersList.js";
import UpdateUser from "./component/admin/UpdateUser.js";
import ProductReviews from "./component/admin/ProductReviews.js";
import Layout from "./component/Layout.js";
import About from "./Pages/About.js";

import PaymentSample from "./Pages/PaymentSample.js";
import NotFound from "./Pages/NotFound.js";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<Layout />}>
          
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/about" element={<About />} />

          <Route path="/search" element={<Search />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/login/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />

          <Route path="/Cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/process/payment" element={<PaymentSample />} />
          <Route path="/success" element={<OrderSuccess />} />

          <Route path="/orders" element={<MyOrders />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/order/:id" element={<OrderDetails />} />

          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/product" element={<NewProduct />} />
          <Route path="/admin/product/:id" element={<UpdateProduct />} />
          <Route path="/admin/orders" element={<OrderList />} />
          <Route path="/admin/order/:id" element={<ProcessOrder />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/user/:id" element={<UpdateUser />} />
          <Route path="/admin/reviews" element={<ProductReviews />} />

        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;
