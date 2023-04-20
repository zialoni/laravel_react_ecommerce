import React from "react";
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import MasterLayout from "./layouts/admin/MasterLayout";
import Home from './components/frontend/Home';
import About from './components/frontend/About';
import Contact from './components/frontend/Contact'

import Dashboard from "./components/admin/Dashboard";
import Profile from "./components/admin/Profile";
import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";
import AdminPrivateRoute from "./routes/AdminPrivateRoute";
import axios from 'axios';
import Category from "./components/admin/category/Category";
import ViewCatgory from "./components/admin/category/ViewCatgory";
import ViewProductDetail from "./components/frontend/collections/ViewProductDetail";
import SingleProductDetail from "./components/frontend/collections/SingleProductDetail";
import ViewCategory from "./components/frontend/collections/ViewCategory";
import EditCategory from "./components/admin/category/EditCategory";
import AddProduct from "./components/admin/product/AddProduct";
import ViewProduct from "./components/admin/product/ViewProduct";
import EditProduct from "./components/admin/product/EditProduct";
import Cart from "./components/frontend/Cart";
import Checkout from "./components/frontend/Checkout";

import Page403 from './components/errors/Page403';
import Page404 from './components/errors/Page404';
import PublicRoute from "./PublicRoute";
axios.defaults.baseURL = "http://localhost:8000/";
//axios.defaults.baseURL = "https://larecom.markhormedia.org/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';


axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {

  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Home />}/>
         <Route path="/collections" element={<ViewCategory />}/>
         <Route path="/collections/:slug" element={<ViewProductDetail />}/>
         <Route path="/collections/:category/:slug" element={<SingleProductDetail />}/>
         <Route path="/cart" element={<Cart />}/>
         <Route path="/checkout" element={<Checkout />}/>
           {/*           <PublicRoute path="/" name="Home"/> */
             
           }


         <Route path="/403" element={<Page403 />}/>
         <Route path="/404" element={<Page404 />}/>

         <Route path="/admin" element = {
           
              <AdminPrivateRoute />
         
         } />
         {/*
         <Route path="/login" element={<Login />}/>
  <Route path="/register" element={<Register />}/> */}
          <Route path="/login"
            element = {localStorage.getItem('auth_token') ? <Navigate to="/" /> : <Login/> }/>
          
          <Route path="/register"
            element = {localStorage.getItem('auth_token') ? <Navigate to="/" /> : <Register/> }/>
      
       
          <Route path="/admin/profile" element={<Profile />}/>
          <Route path="/admin/add-category" element={<Category />}/>
          <Route path="/admin/view-category" element={<ViewCatgory />}/>
          <Route path="/admin/edit-category/:id" element={<EditCategory />}/>
          <Route path="/admin/add-product" element={<AddProduct />}/>
          <Route path="/admin/view-product" element={<ViewProduct />}/>
          <Route path="/admin/edit-product/:id" element={<EditProduct />}/>
          

         
        </Routes>
      </Router>   
    </div>
  );
}

export default App;
